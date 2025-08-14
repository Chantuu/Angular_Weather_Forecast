import {Component, computed, signal} from '@angular/core';
import {WeatherCardSectionComponent} from "../../ui/weather-card-section/weather-card-section.component";
import {WeatherInfoType} from "../../../utilities/enums/weather-info-type.enum";
import {WeatherHighlightSectionComponent} from "../../ui/weather-highlight-section/weather-highlight-section.component";
import {WeatherService} from "../../../services/weather.service";
import {WeatherData} from "../../../utilities/types/weather-data.type";
import {HeaderButtonContainerComponent} from "../header-button-container/header-button-container.component";

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

  /**
   * This computed signal is used to save currently searched city weather data to this component, which will be used
   * inside the component's template.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This enum property was declared to be used inside component template to properly display time
   * based on WeatherInfoType enum.
   */
  protected readonly WeatherInfoType = WeatherInfoType;
}
