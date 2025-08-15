import {Component, inject, signal} from '@angular/core';
import {SidebarButtonComponent} from "../../ui/sidebar-button/sidebar-button.component";
import {SidebarButtonType} from "../../../utilities/enums/sidebar-button.enum";
import {WeatherTabComponent} from "../../ui/weather-tab/weather-tab.component";
import {AboutTabComponent} from "../../ui/about-tab/about-tab.component";
import {CitySearchBarComponent} from "../../ui/city-search-bar/city-search-bar.component";
import {WeatherService} from "../../../services/weather.service";
import {WeatherData} from "../../../utilities/types/weather-data.type";
import {NaComponent} from "../../ui/na/na.component";
import {CityListTabComponent} from "../../ui/city-list-tab/city-list-tab.component";

@Component({
  selector: 'app-sidebar-container',
  imports: [SidebarButtonComponent, WeatherTabComponent, AboutTabComponent, CitySearchBarComponent, NaComponent, CityListTabComponent],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.css'
})
export class SidebarContainerComponent {
  /**
   * This service is responsible for managing and distributing Open-Meteo weather data to the components.
   */
  readonly weatherService = inject(WeatherService);

  /**
   * This enum property was declared to be used inside component template to properly manage sidebar button components.
   */
  readonly SidebarButtonType = SidebarButtonType;


  /**
   * This Signal saves which sidebar button was clicked to display corresponding tab in the sidebar.
   */
  currentSidebarButtonPressed = signal<SidebarButtonType>(SidebarButtonType.Weather);

  /**
   * This signal saves object, which contains structured weather data and it is responsible for distributing this
   * data to the various components.
   *
   * Note: This signal can be null, which means that no city was selected and null checking is necessary.
   */
  weatherData = signal<WeatherData | null>(null);


  /**
   * This function is responsible for updating currentSidebarButtonPressed signal which allows to switch between
   * different tabs in the sidebar.
   *
   * @param currentButtonPressed - Parameter containing which sidebar button was clicked
   */
  setActiveSidebarButton(currentButtonPressed: SidebarButtonType) {
    this.currentSidebarButtonPressed.set(currentButtonPressed);
  }

  /**
   * This method is used to get and save current weather data for corresponding using WeatherService and
   * provided city name. If WeatherService fails to get data or incorrect city name was entered, alert
   * will be shown.
   *
   * @param {string} CityName - String of the desired city name.
   */
  async onFormSubmit(CityName: string) {
      try {
        const resultData = await this.weatherService.getWeatherData(CityName);
        const currentCity = resultData.city;

        // If city data is defined
        if (currentCity) {
          // If this city is already added to the list, make button active
          if (this.weatherService.cityExistsInFavoriteCitiesList(currentCity)) {
            this.weatherService.setFavoriteButtonState(true);
          }
          // If this city is not already added to the list, do not make button active
          else {
            this.weatherService.setFavoriteButtonState(false);
          }
        }

        this.weatherData.set(resultData);
      }
      catch (error) {
        alert(error);
      }
  }
}
