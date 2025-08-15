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
   * This private signal is used to manage HeaderFavoriteButton Component state.
   */
  private _favoriteButtonState = signal<boolean>(false);

  /**
   * This private signal is used to save and manage favorite cities.
   */
  private _favoriteCitiesList = signal<CityData[]>([]);

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
      const result = {
        id: uuid4(),
        cityName: response.data.results[0].name,
        latitude: response.data.results[0].latitude,
        longitude: response.data.results[0].longitude,
      };

      // If this city is already saved to the favorite list, do not generate new id
      const favoriteCurrentCity = this.returnCityIfExistsInFavoriteCitiesList(result);
      if (favoriteCurrentCity) {
        result.id = favoriteCurrentCity.id;
      }

      return result;
    }
    else {
      throw new Error(`Unable to find city ${cityName}`);
    }
  }

  /**
   * This private helper method is responsible for retrieving weather data from the Open-Meteo's API. It awaits
   * CityData object as a parameter to retrieve corresponding weather data.
   *
   * @param cityData - CitiData object containing necessary information to retrieve weather data
   * @returns Promise<WeatherData> - Promise containing retrieved weather data
   * @throws Error - Axios error
   */
  private async getWeatherDataFromApi(cityData: CityData) {
    const response = await axios({
      method: 'GET',
      url: `https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max,precipitation_probability_mean&hourly=weather_code,temperature_2m&timezone=auto`
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
      city: cityData,
      daily: dailyWeatherDataArray,
      hourly: hourlyWeatherDataArray
    }

    this.setSharedWeatherData(weatherDataResult); // Save weather data, which will be shared to other components
    return weatherDataResult;
  }

  /**
   * This async method is responsible for getting weather data using only city name as a parameter. Behind the scenes,
   * it uses private method to retrieve weather data.
   *
   * @param cityName - String containing the name of the desired city
   * @returns Promise<WeatherData> - Promise containing corresponding weather data
   * @throws Error - Axios error
   */
  async getWeatherData(cityName: string): Promise<WeatherData> {
    const cityData = await this.convertCityNameToLatLng(cityName);

    return await this.getWeatherDataFromApi(cityData);
  }

  /**
   * This async method is responsible for getting weather data using CityData object of the desired city
   * name as a parameter. Behind the scenes, it uses private method to retrieve weather data.
   *
   * @param cityData - CityData object containing necessary information of the desired city
   * @returns Promise<WeatherData> - Promise containing corresponding weather data
   * @throws Error - Axios error
   */
  async getWeatherDataFromList(cityData: CityData): Promise<WeatherData> {
    return await this.getWeatherDataFromApi(cityData);
  }

  /**
   * This method returns readonly variant of the favoriteButtonState signal.
   *
   * @returns Signal<boolean> - Signal containing favorteButtonComponents state
   */
  getFavoriteButtonState() {
    return this._favoriteButtonState.asReadonly();
  }

  /**
   * This method is used to control HeaderFavoriteButton Component activation state.
   *
   * @param state - Make HeaderFavoriteButton Component active or inactive
   */
  setFavoriteButtonState(state: boolean) {
    this._favoriteButtonState.set(state);
  }

  /**
   * This method is used to return currently available favorite cities list value from the signal.
   *
   * @returns CityData[] - List of CityData objects
   */
  getFavoriteCitiesList() {
    return this._favoriteCitiesList();
  }

  /**
   * This private method checks, if desired city exists inside the favorite cities list and returns corresponding
   * CityData object if it exists, otherwise undefined.
   *
   * @param cityData - Desired CityData object to be searched.
   * @returns CityData | undefined
   */
  private returnCityIfExistsInFavoriteCitiesList(cityData: CityData) {
    return this._favoriteCitiesList().find((currentCity) => (
        currentCity.cityName === cityData.cityName &&
        currentCity.latitude === cityData.latitude &&
        currentCity.longitude === cityData.longitude
    ));
  }

  /**
   * This method checks if the desired city is saved in the favorite cities list.
   *
   * @param cityData - Desired city to be searched
   * @returns Boolean - Boolean value meaning desired city exists/not exists in the list
   */
  cityExistsInFavoriteCitiesList(cityData: CityData) {
    const result = this.returnCityIfExistsInFavoriteCitiesList(cityData);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This method adds desired city to the favorite cities list, where it checks, if it already exists in this list.
   * If it exists, error is thrown.
   *
   * @param cityData - Desired city to be added
   * @throws Error - Desired city already exists in the list
   */
  addCityToFavoriteCitiesList(cityData: CityData) {
    if (!this.cityExistsInFavoriteCitiesList(cityData)) {
      this._favoriteCitiesList().push(cityData);
    }
    else {
      throw new Error(`Unable to add ${cityData.cityName} to favorite cities list, because it already exists.`);
    }
  }

  /**
   * This method removes desired city from the favorite cities list, where it checks, if it already exists in this list.
   * If it does not exist, error is thrown.
   *
   * @param cityData - Desired city to be removed
   * @throws Error - Desired city does not exist in the list
   */
  removeCityFromFavoriteCitiesList(cityData: CityData) {
    if (this.cityExistsInFavoriteCitiesList(cityData)) {
      const result = this._favoriteCitiesList().filter((currentCity) => {
        console.log(cityData.id);
        console.log(currentCity.id !== cityData.id);
        return currentCity.id !== cityData.id;
      });
      console.log(result);
      this._favoriteCitiesList.set([...result]);
    }
    else {
      throw new
      Error(`Unable to delete ${cityData.cityName} from favorite cities list, because it does not exist`);
    }
  }
}
