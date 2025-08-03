/**
 * This type is used to stored Open-Meteo API data into one object and distribute this data across different components
 * efficiently.
 */
export type WeatherData = {
    /**
     * This property contains name of the searched city.
     */
    city: string;
    /**
     * This property contains all information intended for representing whole day weather data.
     */
    daily: {
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
    }[],
    /**
     * This property contains all information intended for representing hourly weather data for one day.
     */
    hourly: {
        uuid: string,
        temperature: number,
        time: Date,
        weatherCode: number,
    }[]
};