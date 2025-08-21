import {CityData} from "./city-data.type";

/**
 * This type stores Open-Meteo API weather data into one object.
 */
export type WeatherData = {
    /**
     * CityData object containing necessary information about the specified city.
     */
    city: CityData;

    /**
     * This property contains all information intended for representing whole day weather data.
     */
    daily: {
        /**
         * Id of the daily weather object, used to differentiate this object from other objects.
         */
        uuid: string,

        /**
         * Current date.
         */
        date: Date,

        /**
         * Current weather code.
         */
        weatherCode: number,

        /**
         * Current minimum temperature.
         */
        temperatureMax: number,

        /**
         * Current maximum temperature.
         */
        temperatureMin: number,

        /**
         * Current UV index.
         */
        uvIndex: number,

        /**
         * Current sunrise time.
         */
        sunrise: Date,

        /**
         * Current sunset time.
         */
        sunset: Date,

        /**
         * Current precipitation.
         */
        precipitationProbability: number,

        /**
         * Current wind speed.
         */
        windSpeed: number,
    }[],
    /**
     * This property contains all information intended for representing hourly weather data for one day.
     */
    hourly: {
        /**
         * Id of the daily weather object, used to differentiate this object from other objects.
         */
        uuid: string,

        /**
         * Current temperature.
         */
        temperature: number,

        /**
         * Current time.
         */
        time: Date,

        /**
         * Current weather code
         */
        weatherCode: number,
    }[]
};