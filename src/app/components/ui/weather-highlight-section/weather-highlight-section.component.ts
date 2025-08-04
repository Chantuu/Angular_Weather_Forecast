import {Component, OnInit, signal} from '@angular/core';
import {UvIndexCardComponent} from "../weather-highlight-cards/uv-index-card/uv-index-card.component";
import {SunriseSunsetCardComponent} from "../weather-highlight-cards/sunrise-sunset-card/sunrise-sunset-card.component";
import {RainChanceCardComponent} from "../weather-highlight-cards/rain-chance-card/rain-chance-card.component";
import {WindStatusCardComponent} from "../weather-highlight-cards/wind-status-card/wind-status-card.component";
import {WeatherService} from "../../../services/weather.service";
import {WeatherData} from "../../../utilities/types/weather-data.type";

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
export class WeatherHighlightSectionComponent implements OnInit {
  constructor(private weatherService: WeatherService) {
  }

  /**
   * This life-hook method is used to set up RxJS subscription with WeatherService,
   * which will return WeatherData object containing Open-meteo API response data and
   * set it in this component as property. This subscription will automatically
   * update this property with new value when a change occurs.
   */
  ngOnInit(): void {
    this.weatherService.sharedWeatherData$.subscribe(data => {
      this.sharedWeatherData.set(data);
    });
  }

  /**
   * This property is signal, which is used to save WeatherData shared from WeatherService using RxJS.
   */
  sharedWeatherData = signal<WeatherData | null>(null);
}
