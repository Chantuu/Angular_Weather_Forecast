import {Component, input, output} from '@angular/core';

/**
 * This component is favorite button, used to save current city to favorite cities.
 */
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
  // region Component Signals
  /**
   * This input awaits boolean value, which controls visual of the button and tells user when favorite city is saved
   * to the list.
   *
   * Usage example:
   * @example
   * <app-header-favorite-button [buttonActivated]="false" />
   */
  buttonActivated = input.required<boolean>();
  // endregion


  // region Component Outputs
  /**
   * This event sends empty signal, which is used by parent component to add current city to favorite cities.
   *
   * Usage example:
   * @example
   * <app-header-favorite-button (onClick)="favoriteButtonClicked()" />
   */
  onClick = output();
  // endregion


  // region Component Methods
  /**
   * This method emits signal without values to add current city to favorite cities in parent component.
   */
  buttonClicked() {
    this.onClick.emit();
  }
  // endregion
}
