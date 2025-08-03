import {Component, input, OnInit, signal} from '@angular/core';
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
export class WeatherCardSectionComponent implements OnInit {
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
   * This enum property was declared to be used inside component template to properly display hourly
   * or daily weather data cards based on WeatherInfoType enum.
   */
  protected readonly WeatherInfoType = WeatherInfoType;

  /**
   * This property is signal, which is used to save WeatherData shared from WeatherService using RxJS.
   */
  sharedWeatherData = signal<WeatherData | null>(null);

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
