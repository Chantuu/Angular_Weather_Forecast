import { Component } from '@angular/core';
import {SidebarWeatherInfoComponent} from "../sidebar-weather-info/sidebar-weather-info.component";

@Component({
  selector: 'app-weather-tab',
  imports: [SidebarWeatherInfoComponent],
  templateUrl: './weather-tab.component.html',
  styleUrl: './weather-tab.component.css'
})
export class WeatherTabComponent {

}
