import {Component, computed} from '@angular/core';
import {UvIndexCardComponent} from "../weather-highlight-cards/uv-index-card/uv-index-card.component";
import {SunriseSunsetCardComponent} from "../weather-highlight-cards/sunrise-sunset-card/sunrise-sunset-card.component";
import {RainChanceCardComponent} from "../weather-highlight-cards/rain-chance-card/rain-chance-card.component";
import {WindStatusCardComponent} from "../weather-highlight-cards/wind-status-card/wind-status-card.component";
import {WeatherService} from "../../../services/weather.service";

/**
 * This component is a section container, which aligns and manages all weather highlight cards.
 */
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
   * This computed signal saves WeatherData object of the currently searched city, which is used inside component's
   * template.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());
}
