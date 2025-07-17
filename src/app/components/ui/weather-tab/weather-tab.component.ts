import { Component } from '@angular/core';
import {CitySearchBarComponent} from "../city-search-bar/city-search-bar.component";
import {SidebarWeatherInfoComponent} from "../sidebar-weather-info/sidebar-weather-info.component";

@Component({
  selector: 'app-weather-tab',
  imports: [CitySearchBarComponent, SidebarWeatherInfoComponent],
  templateUrl: './weather-tab.component.html',
  styleUrl: './weather-tab.component.css'
})
export class WeatherTabComponent {

}
