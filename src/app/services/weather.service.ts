import {Injectable, signal} from '@angular/core';
import axios from "axios";
import { WeatherData } from "../utilities/types/weather-data.type";
import { v4 as uuid4 } from "uuid";
import {CityData} from "../utilities/types/city-data.type";

/**
 * This service class is responsible for retrieving and managing Open-Meteo APIs weather data for different components
 * across the application.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /**
   * This private signal is used to save currently selected city weather data, which is necessary for sharing it across
   * different components.
   */
  private _sharedWeatherData = signal<WeatherData | null>(null);

  /**
   * This getter method returns currently saved weather data to the desired component.
   *
   * @returns WeatherData object or null
   */
  getSharedWeatherData() {
    return this._sharedWeatherData();
  }

  /**
   * This setter method sets newly requested weather data, which will be shared across different components.
   *
   * @param weatherData - Newly requested weather data
   */
  setSharedWeatherData(weatherData: WeatherData) {
    this._sharedWeatherData.set(weatherData);
  }

  /**
   * This generic private method is used to extract hourly weather data for first day from the Open-Meteo API response.
   *
   * @param desiredHourlyWeatherDataArray - Array containing desired hourly data from API response.
   */
  private extractHourlyWeatherDataFromResponseArrays<T>(desiredHourlyWeatherDataArray: T[]): T[] {
    // This line is enough simply, because API returns hourly weather data for specified days too and using this method
    // only returns hourly weather data of the first dat.
    return desiredHourlyWeatherDataArray.slice(0, 24);
  }

  /**
   * This private async method is responsible for converting city name to the geocode using Open-Meteos API.
   *
   * @param cityName - Desired city to be converted into geocodes.
   * @throws Error - throws error if city with that name was not found or there were connection issues with API.
   * @Warning - This method may be contained inside try/catch block, as this method has probability to throw an error.
   */
  private async convertCityNameToLatLng(cityName: string): Promise<CityData> {
    const response = await axios({
      method: 'GET',
      url: `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en`,
    });

    // If city was successfully found
    if (response.data.results) {
      return {
        cityName: response.data.results[0].name,
        latitude: response.data.results[0].latitude,
        longitude: response.data.results[0].longitude,
      };
    }
    else {
      throw new Error(`Unable to find city ${cityName}`);
    }
  }

  /**
   * This async method is used to get full weather data for desired city using the Open-Meteo API.
   *
   * @param cityName - Desired city to get weather data for.
   * @return Promise<WeatherData> - Promise containing WeatherData object, where all weather related information is
   * saved compactly.
   * @Warning - This method must be contained inside try/catch block, as this method has probability to throw an error.
   */
  async getWeatherData(cityName: string): Promise<WeatherData> {
    const cityGeocode = await this.convertCityNameToLatLng(cityName);

    const response = await axios({
      method: 'GET',
      url: `https://api.open-meteo.com/v1/forecast?latitude=${cityGeocode.latitude}&longitude=${cityGeocode.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max,precipitation_probability_mean&hourly=weather_code,temperature_2m&timezone=auto`
    });

    // Initialization of the daily weather object array
    const dailyWeatherDataArray: {
      uuid: string,
      date: Date,
      weatherCode: number,
      temperatureMax: number,
      temperatureMin: number,
      uvIndex: number,
      sunrise: Date,
      sunset: Date,
      precipitationProbability: number,
      windSpeed: number,
    }[] = [];
    // Initialization of the hourly weather object array
    const hourlyWeatherDataArray: {
      uuid: string,
      temperature: number,
      time: Date,
      weatherCode: number,
    }[] = [];

    // Populating dailyWeatherDataArray with the weather information of each day
    for (let i = 0; i < response.data.daily.weather_code.length; i++) {
      dailyWeatherDataArray[i] = {
        uuid: uuid4(),
        date: new Date(response.data.daily.time[i]),
        weatherCode: response.data.daily.weather_code[i],
        temperatureMax: response.data.daily.temperature_2m_max[i],
        temperatureMin: response.data.daily.temperature_2m_min[i],
        uvIndex: response.data.daily.uv_index_max[i],
        sunrise: new Date(response.data.daily.sunrise[i]),
        sunset: new Date(response.data.daily.sunset[i]),
        precipitationProbability: response.data.daily.precipitation_probability_mean[i],
        windSpeed: response.data.daily.wind_speed_10m_max[i],
      };
    }

    /*  Extracting hourly weather data for 24 hours from received Open-meteo's response object, which contains
       hourly weather data for other days too.*/
    const hourlyTemperatureArray =
        this.extractHourlyWeatherDataFromResponseArrays<number>(response.data.hourly.temperature_2m);
    const hourlyTimeArray = this.extractHourlyWeatherDataFromResponseArrays<string>(response.data.hourly.time);
    const hourlyWeatherCodeArray =
            this.extractHourlyWeatherDataFromResponseArrays<number>(response.data.hourly.weather_code);

    // Getting length from the above array to properly populate hourlyWeatherDataArray
    const hourlyDataArrayLength = hourlyWeatherCodeArray.length;

    // // Populating hourlyWeatherDataArray with the weather information of each hour
    for (let i = 0; i < hourlyDataArrayLength; i++) {
      hourlyWeatherDataArray[i] = {
        uuid: uuid4(),
        temperature: hourlyTemperatureArray[i],
        time: new Date(hourlyTimeArray[i]),
        weatherCode: hourlyWeatherCodeArray[i],
      };
    }

    const weatherDataResult: WeatherData = {
      city: cityGeocode.cityName,
      daily: dailyWeatherDataArray,
      hourly: hourlyWeatherDataArray
    }

    this.setSharedWeatherData(weatherDataResult); // Save weather data, which will be shared to other components
    return weatherDataResult;
  }
}
