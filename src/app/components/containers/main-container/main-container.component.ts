import {Component, OnInit, signal} from '@angular/core';
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
export class MainContainerComponent implements OnInit {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * This life-hook method is used to set up RxJS subscription with WeatherService,
   * which will return WeatherData object containing Open-Meteo API response data and
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

  /**
   * This enum property was declared to be used inside component template to properly display time
   * based on WeatherInfoType enum.
   */
  protected readonly WeatherInfoType = WeatherInfoType;
}
