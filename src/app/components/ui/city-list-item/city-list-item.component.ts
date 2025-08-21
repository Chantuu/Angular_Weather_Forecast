import {Component, input, output} from '@angular/core';
import {CityData} from "../../../utilities/types/city-data.type";

/**
 * This component represents single favorite city entry in the cities tab.
 */
@Component({
  selector: 'app-city-list-item',
  imports: [],
  templateUrl: './city-list-item.component.html',
  styleUrl: './city-list-item.component.css'
})
export class CityListItemComponent {
  // region Component Signals
  /**
   * This input awaits object of CityData type, which contains all the required information about that city.
   *
   * Usage example:
   * @example
   * <app-city-list-item [cityData]="cityDataObject" />
   */
  cityData = input.required<CityData>();

  /**
   * This input awaits boolean value, which marks current list item as selected conditionally.
   *
   * Usage example:
   * @example
   * <app-city-list-item [currentListItemSelected]="true" />
   */
  currentListItemSelected = input.required<boolean>();
  // endregion


  // region Component Outputs
  /**
   * This event occurs after delete button is clicked. It sends object of CityData type, which is used by parent
   * component to properly delete this list item.
   *
   * Usage example:
   * @example
   * <app-city-list-item (onDeleteClick)="handlerMethod()" />
   */
  onDeleteClick = output<CityData>();

  /**
   * This event occurs after list item's paragraph is clicked. It sends object of CityData type, which is used by
   * parent component to display corresponding weather data.
   *
   * Usage example:
   * @example
   * <app-city-list-item (onListItemClick)="handlerMethod()" />
   */
  onListItemClick = output<CityData>();
  // endregion


  // region Component Methods
  /**
   * This handler method emits object of CityData type, which is used for deleting current city list item.
   */
  deleteButtonClicked() {
    this.onDeleteClick.emit(this.cityData());
  }

  /**
   * This handler method emits object of CityData type, which is used for displaying corresponding weather data.
   */
  listItemClicked() {
    this.onListItemClick.emit(this.cityData());
  }
  // endregion
}
