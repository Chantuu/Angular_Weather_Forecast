import {Component, input} from '@angular/core';

@Component({
  selector: 'app-header-favorite-button',
  imports: [],
  templateUrl: './header-favorite-button.component.html',
  styleUrl: './header-favorite-button.component.css',
  host: {
    "[class.buttonActivated]": "buttonActivated()"
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
}
