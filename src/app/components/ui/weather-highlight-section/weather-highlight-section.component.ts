import {Component, computed} from '@angular/core';
import {UvIndexCardComponent} from "../weather-highlight-cards/uv-index-card/uv-index-card.component";
import {SunriseSunsetCardComponent} from "../weather-highlight-cards/sunrise-sunset-card/sunrise-sunset-card.component";
import {RainChanceCardComponent} from "../weather-highlight-cards/rain-chance-card/rain-chance-card.component";
import {WindStatusCardComponent} from "../weather-highlight-cards/wind-status-card/wind-status-card.component";
import {WeatherService} from "../../../services/weather.service";

@Component({
  selector: 'app-weather-highlight-section',
  imports: [
    UvIndexCardComponent,
    SunriseSunsetCardComponent,
    RainChanceCardComponent,
    WindStatusCardComponent
  ],
  templateUrl: './weather-highlight-section.component.html',
  styleUrl: './weather-highlight-section.component.css'
})
export class WeatherHighlightSectionComponent {
  constructor(private weatherService: WeatherService) {
  }

  /**
   * This computed signal is used to save currently searched city weather data to this component, which will be used
   * inside the component's template.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());
}
