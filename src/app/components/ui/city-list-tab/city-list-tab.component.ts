import {Component, computed} from '@angular/core';
import {CityListItemComponent} from "../city-list-item/city-list-item.component";
import {WeatherService} from "../../../services/weather.service";
import {CityData} from "../../../utilities/types/city-data.type";

@Component({
  selector: 'app-city-list-tab',
  imports: [
    CityListItemComponent
  ],
  templateUrl: './city-list-tab.component.html',
  styleUrl: './city-list-tab.component.css'
})
export class CityListTabComponent {
  constructor(private readonly weatherService: WeatherService) {
  }

  /**
   * This computed signal contains weather data of the currently searched city, used to mark correct favorite city list
   * item as selected. It may be undefined.
   */
  sharedWeatherData = computed(() => this.weatherService.getSharedWeatherData());

  /**
   * This computed signal contains list containing saved favorite cities as CityData objects, which are displayed
   * as list items in the template.
   */
  favoriteCitiesList = computed(() => this.weatherService.getFavoriteCitiesList());

  /**
   * This handler method is responsible for deleting desired city from the favorite cities list.
   *
   * @param currentCity - Desired city to be deleted
   */
  deleteButtonClicked(currentCity: CityData) {
    this.weatherService.removeCityFromFavoriteCitiesList(currentCity);

    // If deleted city was marked as selected list item, make favorite button inactive
    if (currentCity.id == this.sharedWeatherData()?.city.id) {
      this.weatherService.setFavoriteButtonState(false);
    }
  }

  /**
   * This async handler method is responsible for getting weather data, when list item was clicked.
   *
   * @param currentCity - Desired city to get weather data for
   */
  async listItemClicked(currentCity: CityData) {
    await this.weatherService.getWeatherDataFromList(currentCity);

    // Getting current state of the favorite button
    const currentFavoriteButtonState = this.weatherService.getFavoriteButtonState()();

    // If previous city was not in favorites list and list item was clicked, make favorite button active
    if (!currentFavoriteButtonState) {
      this.weatherService.setFavoriteButtonState(true);
    }
  }
}
