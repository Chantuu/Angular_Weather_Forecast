import {calculateDayNightForIcon} from "./calculate-day-night-for-icon.function";

/**
 *  This function returns css url string of the corresponding weather icons, intended to be dynamically bound
 * to the mask-image style for displaying those icons.
 *
 * @param weatherCode - Weather code provided by Open-Meteo API, which will display corresponding weather icon.
 * @returns {string} - CSS Url string of the corresponding weather icon.
 */
export function getWeatherIconPath(weatherCode: number): string {
    let iconName = '';

    // Clear Sky
    if (weatherCode === 0)  {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-clear';
        } else {
            iconName = 'wi-day-sunny';
        }
    }
    // Partly Cloudy
    else if (weatherCode === 1 || weatherCode === 2 ) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-partly-cloudy';
        } else {
            iconName = 'wi-day-sunny-overcast';
        }
    }
    // Cloudy
    else if (weatherCode === 3 ) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-cloudy';
        } else {
            iconName = 'wi-day-cloudy';
        }
    }
    // Fog
    else if (weatherCode === 45 || weatherCode === 48) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-fog';
        } else {
            iconName = 'wi-day-fog';
        }
    }
    // Drizzle
    else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 ||
        weatherCode === 56 || weatherCode === 57) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-sprinkle';
        } else {
            iconName = 'wi-day-sprinkle';
        }
    }
    // Rain
    else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65 ||
        weatherCode === 66 || weatherCode === 67) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-rain';
        } else {
            iconName = 'wi-day-rain';
        }
    }
    // Snowfall
    else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-snow';
        } else {
            iconName = 'wi-day-snow';
        }
    }
    // Snow Grains
    else if (weatherCode === 77) {
        iconName = 'wi-snowflake-cold';
    }
    // Rain Showers
    else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-showers';
        } else {
            iconName = 'wi-day-showers';
        }
    }
    // Snow Showers
    else if (weatherCode === 85 || weatherCode === 86) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-snow-shower';
        } else {
            iconName = 'wi-day-snow-shower';
        }
    }
    // Thunderstorm
    else if (weatherCode === 95) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-thunderstorm';
        } else {
            iconName = 'wi-day-thunderstorm';
        }
    }
    // Thunderstorm with hail
    else if (weatherCode === 96 || weatherCode === 99) {
        if (calculateDayNightForIcon()) {
            iconName = 'wi-night-alt-storm-hail';
        } else {
            iconName = 'wi-day-storm-hail';
        }
    }

    return `url(assets/sidebar_Main_Weather_Icons/${iconName}.svg)`;
}