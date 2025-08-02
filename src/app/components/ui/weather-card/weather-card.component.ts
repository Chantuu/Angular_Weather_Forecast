import {Component, input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {
  getWeatherIconPath
} from "../../../utilities/functions/get-weather-icon-path.function";

@Component({
  selector: 'app-weather-card',
  imports: [
    NgStyle
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  /**
   * This property is used to save getWeatherIconPath function, which enables it to be used in the component template.
   */
  protected readonly getWeatherIconPath = getWeatherIconPath;

  /**
   * This required input receives current weather temperature value of number type to be
   * displayed inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherTemperature]="33.5" />
   */
  weatherTemperature = input.required<number>();

  /**
   * This required input receives current weather code value of number type to display
   * corresponding weather icon.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherCode]="0" />
   */
  weatherCode = input.required<number>();

  /**
   * This required input receives current date value of string type to display current hour or weekday
   * inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-card [weatherDateTime]="01:00 | Tuesday" />
   */
  weatherDateTime = input.required<string>();
}
