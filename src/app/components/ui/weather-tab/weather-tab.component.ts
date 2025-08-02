import {Component, input} from '@angular/core';
import {SidebarWeatherInfoComponent} from "../sidebar-weather-info/sidebar-weather-info.component";
import {
  getWeatherIconPath
} from "../../../utilities/functions/get-weather-icon-path.function";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-weather-tab',
  imports: [SidebarWeatherInfoComponent, NgStyle],
  templateUrl: './weather-tab.component.html',
  styleUrl: './weather-tab.component.css'
})
export class WeatherTabComponent {
  /**
   * This property is used to save getWeatherIconPath function, which enables it to be used in the component template.
   */
  protected readonly getWeatherIconPath = getWeatherIconPath;


  /**
   * This required input receives current daily weather temperature value of number type to be
   * displayed inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherTemperature]="33.5" />
   */
  weatherTemperature = input.required<number>();

  /**
   * This required input receives current date value of Date type to display current weekday inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-tab [currentDate]="new Date(2025, 8, 12)" />
   */
  currentDate = input.required<Date>();

  /**
   * This required input receives current city name of string type to display it inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-tab [currentCityName]="Poti" />
   */
  currentCityName = input.required<string>();

  /**
   * This required input receives current weather code value of number type to display
   * corresponding weather icon based on the provided value.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherCode]="0" />
   */
  weatherCode = input.required<number>();

  /** This required input receives weather precipitation probability value of number type
   * to display it inside the component.
   *
   * Usage example:
   * @example
   * <app-weather-tab [weatherPrecipitationProbability]="22" />
   */
  weatherPrecipitationProbability = input.required<number>();
}
