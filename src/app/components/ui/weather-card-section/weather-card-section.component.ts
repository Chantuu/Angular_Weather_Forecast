import {Component, computed, input,} from '@angular/core';
import {WeatherInfoType} from "../../../utilities/enums/weather-info-type.enum";
import {WeatherCardComponent} from "../weather-card/weather-card.component";
import {WeatherService} from "../../../services/weather.service";
import {WeatherData} from "../../../utilities/types/weather-data.type";

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

  /**
   * This enum property was declared to be used inside component template to properly display hourly
   * or daily weather data cards based on WeatherInfoType enum.
   */
  protected readonly WeatherInfoType = WeatherInfoType;

  /**
   * This computed signal is used to save currently searched city weather data to this component, which will be used
   * inside the component's template.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This input awaits title string, which will be displayed as the section's title.
   *
   * Usage example:
   * @example
   * <app-weather-card-section sectionTitle="Hour" />
   */
  sectionTitle = input.required<string>();

  /**
   * This input awaits WeatherInfoType enum, which will tell this section to display weather data hourly or daily.
   *
   * Usage example:
   * @example
   * <app-weather-card-section [weatherInfoType]="WeatherInfoType.Hourly" />
   */
  weatherInfoType = input.required<WeatherInfoType>();
}
