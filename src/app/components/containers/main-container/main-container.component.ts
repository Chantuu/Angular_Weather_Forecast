import { Component } from '@angular/core';
import {WeatherCardSectionComponent} from "../../ui/weather-card-section/weather-card-section.component";
import {WeatherInfoType} from "../../../utilities/enums/weather-info-type.enum";
import {WeatherHighlightSectionComponent} from "../../ui/weather-highlight-section/weather-highlight-section.component";

@Component({
  selector: 'app-main-container',
  imports: [
    WeatherCardSectionComponent,
    WeatherHighlightSectionComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent {
  /**
   * This enum property was declared to be used inside component template to properly display time
   * based on WeatherInfoType enum.
   */
  protected readonly WeatherInfoType = WeatherInfoType;
}
