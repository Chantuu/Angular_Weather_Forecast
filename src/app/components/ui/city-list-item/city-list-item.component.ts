import {Component, input, output} from '@angular/core';
import {CityData} from "../../../utilities/types/city-data.type";

@Component({
  selector: 'app-city-list-item',
  imports: [],
  templateUrl: './city-list-item.component.html',
  styleUrl: './city-list-item.component.css'
})
export class CityListItemComponent {
  /**
   * This input awaits CityData object, which contains all the necessary information about the desired city.
   *
   * Usage example:
   * @example
   * <app-city-list-item [cityData]="cityDataObject" />
   */
  cityData = input.required<CityData>();

  /**
   * This input await boolean value, which will mark this list item as selected conditionally.
   *
   * Usage example:
   * @example
   * <app-city-list-item [currentListItemSelected]="true" />
   */
  currentListItemSelected = input.required<boolean>();

  /**
   * This event occurs, when delete button is clicked, and it sends saved CityData object as a value, which will be used
   * by parent component to delete it from the list.
   *
   * Usage example:
   * @example
   * <app-city-list-item (onDeleteClick)="handlerMethod()" />
   */
  onDeleteClick = output<CityData>();

  /**
   * This event occurs, when list item's text is clicked, which sends CityData object as a value, which will be used by
   * parent component to display weather data of that city.
   *
   * Usage example:
   * @example
   * <app-city-list-item (onListItemClick)="handlerMethod()" />
   */
  onListItemClick = output<CityData>();

  /**
   * This handler method sends CityData object as a value, which is necessary for deleting that city from favorite
   * cities list.
   */
  deleteButtonClicked() {
    this.onDeleteClick.emit(this.cityData());
  }

  /**
   * This handler method sends CityData object as a value, which is necessary for displaying corresponding weather data.
   */
  listItemClicked() {
    this.onListItemClick.emit(this.cityData());
  }
}
