import {Injectable, signal} from '@angular/core';
import {CityData} from "../utilities/types/city-data.type";

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {
  /**
   * This private signal is used to manage HeaderFavoriteButton Component state.
   */
  private _favoriteButtonState = signal<boolean>(false);

  /**
   * This private signal is used to save and manage favorite cities.
   */
  private _favoriteCitiesList = signal<CityData[]>([]);

  /**
   * This method returns readonly variant of the favoriteButtonState signal.
   *
   * @returns Signal<boolean> - Signal containing favorteButtonComponents state
   */
  getFavoriteButtonState() {
    return this._favoriteButtonState.asReadonly();
  }

  /**
   * This method is used to control HeaderFavoriteButton Component activation state.
   *
   * @param state - Make HeaderFavoriteButton Component active or inactive
   */
  setFavoriteButtonState(state: boolean) {
    this._favoriteButtonState.set(state);
  }

  /**
   * This method is used to return currently available favorite cities list value from the signal.
   *
   * @returns CityData[] - List of CityData objects
   */
  getFavoriteCitiesList() {
    return this._favoriteCitiesList();
  }

  /**
   * This method checks, if desired city exists inside the favorite cities list and returns corresponding
   * CityData object if it exists, otherwise undefined.
   *
   * @param cityData - Desired CityData object to be searched.
   * @returns CityData | undefined
   */
  returnCityIfExistsInFavoriteCitiesList(cityData: CityData) {
    return this._favoriteCitiesList().find((currentCity) => (
        currentCity.cityName === cityData.cityName &&
        currentCity.latitude === cityData.latitude &&
        currentCity.longitude === cityData.longitude
    ));
  }

  /**
   * This method checks if the desired city is saved in the favorite cities list.
   *
   * @param cityData - Desired city to be searched
   * @returns Boolean - Boolean value meaning desired city exists/not exists in the list
   */
  cityExistsInFavoriteCitiesList(cityData: CityData) {
    const result = this.returnCityIfExistsInFavoriteCitiesList(cityData);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This method adds desired city to the favorite cities list, where it checks, if it already exists in this list.
   * If it exists, error is thrown.
   *
   * @param cityData - Desired city to be added
   * @throws Error - Desired city already exists in the list
   */
  addCityToFavoriteCitiesList(cityData: CityData) {
    if (!this.cityExistsInFavoriteCitiesList(cityData)) {
      this._favoriteCitiesList().push(cityData);
    }
    else {
      throw new Error(`Unable to add ${cityData.cityName} to favorite cities list, because it already exists.`);
    }
  }

  /**
   * This method removes desired city from the favorite cities list, where it checks, if it already exists in this list.
   * If it does not exist, error is thrown.
   *
   * @param cityData - Desired city to be removed
   * @throws Error - Desired city does not exist in the list
   */
  removeCityFromFavoriteCitiesList(cityData: CityData) {
    if (this.cityExistsInFavoriteCitiesList(cityData)) {
      const result = this._favoriteCitiesList().filter((currentCity) => {
        return currentCity.id !== cityData.id;
      });
      console.log(result);
      this._favoriteCitiesList.set([...result]);
    }
    else {
      throw new
      Error(`Unable to delete ${cityData.cityName} from favorite cities list, because it does not exist`);
    }
  }
}
