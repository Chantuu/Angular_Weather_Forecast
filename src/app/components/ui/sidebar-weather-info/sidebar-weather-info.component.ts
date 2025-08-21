import {Component, computed, input} from '@angular/core';

/**
 * This is sidebar weather information component, which is configurable to display desired weather data.
 */
@Component({
  selector: 'app-sidebar-weather-info',
  imports: [],
  templateUrl: './sidebar-weather-info.component.html',
  styleUrl: './sidebar-weather-info.component.css'
})
export class SidebarWeatherInfoComponent {
  // region Component Inputs
  /**
   * This required input awaits desired icon name, which in the component.
   *
   * Note: that this icon must be located inside src/assets/button_Icons folder to properly
   * use and display this icon.
   *
   * Usage Example:
   * @example
   * <app-sidebar-weather-info iconName="cloud_sidebar_info">Mostly Cloudy</app-sidebar-weather-info>
   */
  iconName = input.required<string>();

  /**
   * This required input awaits desired description of the icon, used for img element and accessibility.
   *
   * Usage Example:
   * @example
   * <app-sidebar-weather-info iconAltText="Raindrop Icon">Rain - 40%</app-sidebar-weather-info>
   */
  iconAltText = input.required<string>();

  /**
   * This computed signal returns full path of the input icon.
   */
  getIconPath = computed<string>(() => `assets/sidebar_Weather_Info_Icons/${this.iconName()}.svg`);
  // endregion
}
