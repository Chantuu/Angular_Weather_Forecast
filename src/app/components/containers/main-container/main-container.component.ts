import {Component, computed, signal} from '@angular/core';
import {WeatherCardSectionComponent} from "../../ui/weather-card-section/weather-card-section.component";
import {WeatherInfoType} from "../../../utilities/enums/weather-info-type.enum";
import {WeatherHighlightSectionComponent} from "../../ui/weather-highlight-section/weather-highlight-section.component";
import {WeatherService} from "../../../services/weather.service";
import {HeaderButtonContainerComponent} from "../header-button-container/header-button-container.component";

/**
 * This component is a container used to align main weather data UI properly.
 */
@Component({
  selector: 'app-main-container',
  imports: [
    WeatherCardSectionComponent,
    WeatherHighlightSectionComponent,
    HeaderButtonContainerComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent {
  constructor(private readonly weatherService: WeatherService) {}

  // region Component Signals and Declared Types
  /**
   * This computed signal saves currently searched city's weather data object.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This property saves WeatherInfoType Enum, which is used inside the component's template.
   */
  protected readonly WeatherInfoType = WeatherInfoType;
  // endregion
}
