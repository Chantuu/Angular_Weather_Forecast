import {Component, signal} from '@angular/core';
import {SidebarButtonComponent} from "../../ui/sidebar-button/sidebar-button.component";
import {SidebarButtonType} from "../../../utilities/enums/sidebar-button.enum";
import {WeatherTabComponent} from "../../ui/weather-tab/weather-tab.component";
import {AboutTabComponent} from "../../ui/about-tab/about-tab.component";
import {CitySearchBarComponent} from "../../ui/city-search-bar/city-search-bar.component";
import {WeatherService} from "../../../services/weather.service";
import {WeatherData} from "../../../utilities/types/weather-data.type";
import {NaComponent} from "../../ui/na/na.component";
import {CityListTabComponent} from "../../ui/city-list-tab/city-list-tab.component";
import {FavoriteCitiesService} from "../../../services/favorite-cities.service";

/**
 * This component is sidebar container, which manages and aligns sidebar container components.
 */
@Component({
  selector: 'app-sidebar-container',
  imports: [SidebarButtonComponent,
    WeatherTabComponent,
    AboutTabComponent,
    CitySearchBarComponent,
    NaComponent,
    CityListTabComponent],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.css'
})
export class SidebarContainerComponent {
  constructor(private readonly weatherService: WeatherService,
              private readonly favoriteCitiesService: FavoriteCitiesService) {}

  // region Component Signals and Declared Types
  /**
   * This property saves SidebarButtonType enum, which is used inside the component's template.
   */
  readonly SidebarButtonType = SidebarButtonType;


  /**
   * This Signal saves currently clicked sidebar button to display corresponding sidebar tab.
   */
  currentSidebarButtonPressed = signal<SidebarButtonType>(SidebarButtonType.Weather);

  /**
   * This signal saves object of WeatherData type, containing structured weather data and used to distribute this data.
   *
   * Note: This signal can be null, which means that no city was selected and null checking is necessary.
   */
  weatherData = signal<WeatherData | null>(null);
  // endregion


  // region Component Methods
  /**
   * This function saves currently pressed sidebar button in the currentSidebarButtonPressed signal, used for switching
   * to the corresponding sidebar tab.
   *
   * @param currentButtonPressed - Currently clicked sidebar button type
   */
  setActiveSidebarButton(currentButtonPressed: SidebarButtonType) {
    this.currentSidebarButtonPressed.set(currentButtonPressed);
  }

  /**
   * This method is used to handle incoming event from CitySearchBar Component. It tries to retrieve and save
   * WeatherData object in the WeatherService to distribute this data. It additionally manages favorite button's state.
   * This method has error exception built in.
   *
   * @param {string} CityName - String of the desired city name.
   */
  async onFormSubmit(CityName: string) {
      try {
        // Getting weather data of the desired city
        const resultData = await this.weatherService.getWeatherData(CityName);
        const currentCity = resultData.city;

        // If weather data for the desired city is found
        if (currentCity) {
          // If this city is already added to the list, make button active
          if (this.favoriteCitiesService.cityExistsInFavoriteCitiesList(currentCity)) {
            this.favoriteCitiesService.setFavoriteButtonState(true);
          }
          // If this city is not already added to the list, do not make button active
          else {
            this.favoriteCitiesService.setFavoriteButtonState(false);
          }
        }

        this.weatherData.set(resultData);
      }
      // Handle axios errors
      catch (error) {
        alert(error);
      }
  }
  // endregion
}
