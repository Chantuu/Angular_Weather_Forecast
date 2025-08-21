import {Component, input} from '@angular/core';
import {SidebarWeatherInfoComponent} from "../sidebar-weather-info/sidebar-weather-info.component";
import {
  getWeatherIconPath
} from "../../../utilities/functions/get-weather-icon-path.function";
import {NgStyle} from "@angular/common";
import {TemperatureFormatPipe} from "../../../pipes/temperature-format.pipe";

/**
 * This is weather tab component, which is used to display main weather data.
 */
@Component({
  selector: 'app-weather-tab',
    imports: [SidebarWeatherInfoComponent, NgStyle, TemperatureFormatPipe],
  templateUrl: './weather-tab.component.html',
  styleUrl: './weather-tab.component.css'
})
export class WeatherTabComponent {
  // region Component Inputs and Declared Types
  /**
   * This property saves getWeatherIconPath function, which is used inside component's template.
   */
  protected readonly getWeatherIconPath = getWeatherIconPath;


  /**
   * This required input awaits number value, which represents current temperature of the weather.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherTemperature]="33.5" />
   */
  weatherTemperature = input.required<number>();

  /**
   * This required input awaits Date object value, which represents current weekday.
   *
   * Usage example:
   * @example
   * <app-weather-tab [currentDate]="new Date(2025, 8, 12)" />
   */
  currentDate = input.required<Date>();

  /**
   * This required input awaits string value, which represents currently searched city name.
   *
   * Usage example:
   * @example
   * <app-weather-tab [currentCityName]="Poti" />
   */
  currentCityName = input.required<string>();

  /**
   * This required input awaits number value, which represents current weather code and corresponding icon is displayed.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherCode]="0" />
   */
  weatherCode = input.required<number>();

  /**
   * This required input awaits number value, which represents precipitation probability.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherPrecipitationProbability]="22" />
   */
  weatherPrecipitationProbability = input.required<number>();
  // endregion
}
