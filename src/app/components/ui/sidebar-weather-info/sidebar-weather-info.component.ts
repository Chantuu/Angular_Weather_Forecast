import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-sidebar-weather-info',
  imports: [],
  templateUrl: './sidebar-weather-info.component.html',
  styleUrl: './sidebar-weather-info.component.css'
})
export class SidebarWeatherInfoComponent {
  /**
   * This required input awaits name of the svg icon, which must located in the src/app/assets/sidebar_Weather_Info_Icons
   * folder and file extension is not required.
   *
   * Usage Example:
   * @example
   * <app-sidebar-weather-info iconName="cloud_sidebar_info">Mostly Cloudy</app-sidebar-weather-info>
   */
  iconName = input.required<string>();

  /**
   * This required input awaits alt text of the icon, which used for img element and intends to improve accessibility
   * of the web application.
   *
   * Usage Example:
   * @example
   * <app-sidebar-weather-info iconAltText="Raindrop Icon">Rain - 40%</app-sidebar-weather-info>
   */
  iconAltText = input.required<string>();

  /**
   * This computed signal automatically computes and returns full path of the input icon to dynamically add desired
   * icons in the component.
   */
  getIconPath = computed<string>(() => `assets/sidebar_Weather_Info_Icons/${this.iconName()}.svg`);
}
