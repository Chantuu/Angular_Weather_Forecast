import {Component, computed} from '@angular/core';
import {CityListItemComponent} from "../city-list-item/city-list-item.component";
import {WeatherService} from "../../../services/weather.service";
import {CityData} from "../../../utilities/types/city-data.type";
import {FavoriteCitiesService} from "../../../services/favorite-cities.service";

/**
 * This component is used to manage and align CityListItem components.
 */
@Component({
  selector: 'app-city-list-tab',
  imports: [
    CityListItemComponent
  ],
  templateUrl: './city-list-tab.component.html',
  styleUrl: './city-list-tab.component.css'
})
export class CityListTabComponent {
  constructor(private readonly weatherService: WeatherService,
              private readonly favoriteCitiesService: FavoriteCitiesService) {
  }

  // region Component Signals
  /**
   * This computed signal saves object of WeatherData type, containing structured weather data and used
   * to distribute this data.
   *
   * Note: This signal can be null, which means that no city was selected and null checking is necessary.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This computed signal saves list, containing CityData type objects, which represent favorite cities.
   */
  favoriteCitiesList = computed(() => this.favoriteCitiesService.getFavoriteCitiesList());
  // endregion


  // region Component Methods
  /**
   * This handler method deletes desired city from the favorite cities list.
   *
   * @param currentCity - Desired CityObject to be deleted
   */
  deleteButtonClicked(currentCity: CityData) {
    this.favoriteCitiesService.removeCityFromFavoriteCitiesList(currentCity);

    // If deleted city was marked as selected list item, make favorite button inactive
    if (currentCity.id == this.sharedWeatherData()?.city.id) {
      this.favoriteCitiesService.setFavoriteButtonState(false);
    }
  }

  /**
   * This asynchronous handler method displays full weather data for the desired city, when corresponding CityListItem
   * component is clicked.
   *
   * @param currentCity - Desired CityObject to get weather data for
   */
  async listItemClicked(currentCity: CityData) {
    await this.weatherService.getWeatherDataFromList(currentCity);

    // Getting current state of the favorite button
    const currentFavoriteButtonState = this.favoriteCitiesService.getFavoriteButtonState()();

    // If previous city was not in favorites list and list item was clicked, make favorite button active
    if (!currentFavoriteButtonState) {
      this.favoriteCitiesService.setFavoriteButtonState(true);
    }
  }
  // endregion
}
