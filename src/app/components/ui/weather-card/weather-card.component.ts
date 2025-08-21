import {Component, input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {
  getWeatherIconPath
} from "../../../utilities/functions/get-weather-icon-path.function";
import { WeatherInfoType } from "../../../utilities/enums/weather-info-type.enum";
import {TemperatureFormatPipe} from "../../../pipes/temperature-format.pipe";

/**
 * This is weather card component, which is configurable to display desired weather information.
 */
@Component({
  selector: 'app-weather-card',
  imports: [
    NgStyle,
    TemperatureFormatPipe
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  // region Component Inputs and Declared Types
  /**
   * This property saves WeatherInfoType Enum, which is used inside component's template.
   */
  protected readonly WeatherInfoType = WeatherInfoType;

  /**
   * This property saves getWeatherIconPath function, which is used inside component's template.
   */
  protected readonly getWeatherIconPath = getWeatherIconPath;

  /**
   * This required input awaits current weather temperature value of number type to be
   * displayed inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherTemperature]="33.5" />
   */
  weatherTemperature = input.required<number>();

  /**
   * This required input awaits current weather code value of number type to display
   * corresponding weather icon.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherCode]="0" />
   */
  weatherCode = input.required<number>();

  /**
   * This required input awaits current date value of string type to display current hour or weekday
   * inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherDateTime]="new Date(2025, 8, 12)" />
   */
  weatherDateTime = input.required<Date>();

  /**
   * This required input awaits WeatherInfoType Enum, determining to display weather time in hourly or weekday format.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherInfoType]="WeatherInfoType.Hourly" />
   */
  weatherInfoType = input.required<WeatherInfoType>();
  // endregion
}
