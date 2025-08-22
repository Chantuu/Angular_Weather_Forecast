import {Component, computed, signal} from '@angular/core';
import {HeaderToggleButtonComponent} from "../../ui/header-buttons/header-toggle-button/header-toggle-button.component";
import {HeaderToggleButtonType} from "../../../utilities/enums/header-toggle-button-type.enum";
import {
  HeaderFavoriteButtonComponent
} from "../../ui/header-buttons/header-favorite-button/header-favorite-button.component";
import {TemperatureFormatService} from "../../../services/temperature-format.service";
import {WeatherService} from "../../../services/weather.service";
import {FavoriteCitiesService} from "../../../services/favorite-cities.service";

/**
 * This component is responsible for aligning and managing header buttons.
 */
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

  // region Component Signals
  /**
   * This property contains HeaderToggleButtonType type, which is used inside the component's template.
   */
  protected readonly HeaderToggleButtonType = HeaderToggleButtonType;

  /**
   * This computed signal saves currently searched city's weather data object.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This signal manages which toggle button is currently active determining, which format is
   * used to display temperature.
   */
  currentActiveButton =
      computed(() => this.temperatureFormatService.getTemperatureFormat());

  /**
   * This computed signal saves favorite button's state, which is used to make it conditionally active.
   */
  favoriteButtonActive =
      computed(() => this.favoriteCitiesService.getFavoriteButtonState()());
  // endregion


  // region Component Methods
  /**
   * This function sets currently clicked temperature button as an active button, which displays temperature in the
   * desired format.
   *
   * @param buttonType - Recently clicked temperature button
   */
  toggleButtonClicked(buttonType: HeaderToggleButtonType) {
    this.temperatureFormatService.setTemperatureFormat(buttonType);
  }

  /**
   * This method handles incoming click event from the HeaderFavoriteButton Component and makes it active conditionally.
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
  // endregion
}
