import {Component, computed, signal} from '@angular/core';
import {HeaderToggleButtonComponent} from "../../ui/header-buttons/header-toggle-button/header-toggle-button.component";
import {HeaderToggleButtonType} from "../../../utilities/enums/header-toggle-button-type.enum";
import {
  HeaderFavoriteButtonComponent
} from "../../ui/header-buttons/header-favorite-button/header-favorite-button.component";
import {TemperatureFormatService} from "../../../services/temperature-format.service";
import {WeatherService} from "../../../services/weather.service";
import {FavoriteCitiesService} from "../../../services/favorite-cities.service";

@Component({
  selector: 'app-header-button-container',
  imports: [
    HeaderToggleButtonComponent,
    HeaderFavoriteButtonComponent,
  ],
  templateUrl: './header-button-container.component.html',
  styleUrl: './header-button-container.component.css'
})
export class HeaderButtonContainerComponent {
  constructor(private readonly temperatureFormatService: TemperatureFormatService,
              private readonly weatherService: WeatherService,
              private readonly favoriteCitiesService: FavoriteCitiesService) {}

  /**
   * This property contains HeaderToggleButtonType type, which is necessary to use it inside the component's template.
   */
  protected readonly HeaderToggleButtonType = HeaderToggleButtonType;

  /**
   * This computed signal is used to make currently searched city available to this component.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This signal is used to manage which toggle button is currently active, which in turn determines, which format is
   * used to display temperature.
   */
  currentActiveButton =
      signal<HeaderToggleButtonType>(HeaderToggleButtonType.celsius);

  /**
   * This computed signal is used to make favorite button active conditionally from the service.
   */
  favoriteButtonActive =
      computed(() => this.favoriteCitiesService.getFavoriteButtonState()());

  /**
   * This function is used to set currently clicked toggle button as an active button, which will be used to set
   * corresponding temperature format.
   *
   * @param buttonType - Which toggle button was recently clicked
   */
  toggleButtonClicked(buttonType: HeaderToggleButtonType) {
    this.currentActiveButton.set(buttonType);
    this.temperatureFormatService.setTemperatureFormat(buttonType);
  }

  /**
   * This method is used to handle click event from the HeaderFavoriteButton Component and make that button active
   * conditionally.
   */
  favoriteButtonClicked() {
    const currentCity = this.sharedWeatherData()?.city;

    // If current city data is available
    if (currentCity) {
      // If current city is not added to the favorite cities list, add it
      if (!this.favoriteCitiesService.cityExistsInFavoriteCitiesList(currentCity)) {
        this.favoriteCitiesService.addCityToFavoriteCitiesList(currentCity);
        this.favoriteCitiesService.setFavoriteButtonState(true);
      }
      // If current city is added to the favorite cities list, remove it
      else {
        this.favoriteCitiesService.removeCityFromFavoriteCitiesList(currentCity);
        this.favoriteCitiesService.setFavoriteButtonState(false);
      }
    }
  }
}
