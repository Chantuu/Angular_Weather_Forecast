import {Component, computed, input,} from '@angular/core';
import {WeatherInfoType} from "../../../utilities/enums/weather-info-type.enum";
import {WeatherCardComponent} from "../weather-card/weather-card.component";
import {WeatherService} from "../../../services/weather.service";

/**
 * This component is a weather card section, used to align and manage WeatherCard components.
 */
@Component({
  selector: 'app-weather-card-section',
  imports: [
    WeatherCardComponent
  ],
  templateUrl: './weather-card-section.component.html',
  styleUrl: './weather-card-section.component.css'
})
export class WeatherCardSectionComponent {
  constructor(private weatherService: WeatherService) {
  }

  // region Component Signals and Declared Types
  /**
   * This property saves WeatherInfoType Enum, which is used inside component's template.
   */
  protected readonly WeatherInfoType = WeatherInfoType;

  /**
   * This computed signal saves WeatherData object of the currently searched city, which is used to display weather data
   * UI.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());
  // endregion


  // region Component Inputs
  /**
   * This required input awaits title string, which is displayed as the section's title.
   *
   * Usage example:
   * @example
   * <app-weather-card-section sectionTitle="Hour" />
   */
  sectionTitle = input.required<string>();

  /**
   * This input awaits WeatherInfoType Enum value, which controls to display weather data in hourly or daily format.
   *
   * Usage example:
   * @example
   * <app-weather-card-section [weatherInfoType]="WeatherInfoType.Hourly" />
   */
  weatherInfoType = input.required<WeatherInfoType>();
  // endregion
}
