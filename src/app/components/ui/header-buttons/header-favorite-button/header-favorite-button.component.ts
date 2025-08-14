import {Component, input, output} from '@angular/core';
import {WeatherService} from "../../../../services/weather.service";

@Component({
  selector: 'app-header-favorite-button',
  imports: [],
  templateUrl: './header-favorite-button.component.html',
  styleUrl: './header-favorite-button.component.css',
  host: {
    "[class.buttonActivated]": "buttonActivated()",
    "(click)": "buttonClicked()"
  }
})
export class HeaderFavoriteButtonComponent {
  /**
   * This input awaits boolean value, which controls visual of the button and tells user when favorite city is saved
   * to the list.
   *
   * Usage example:
   * @example
   * <app-header-favorite-button [buttonActivated]="false" />
   */
  buttonActivated = input.required<boolean>();

  /**
   * This event sends empty signal, which means city was added to the favorite cities list.
   *
   * Usage example:
   * @example
   * <app-header-favorite-button (onClick)="favoriteButtonClicked()" />
   */
  onClick = output();

  /**
   * This method is responsible for emitting event to the parent component.
   */
  buttonClicked() {
    this.onClick.emit();
  }
}
