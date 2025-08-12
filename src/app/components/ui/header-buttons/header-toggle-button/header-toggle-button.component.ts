import {Component, input, output} from '@angular/core';
import {HeaderToggleButtonType} from "../../../../utilities/enums/header-toggle-button-type.enum";

@Component({
  selector: 'app-header-toggle-button',
  imports: [],
  templateUrl: './header-toggle-button.component.html',
  styleUrl: './header-toggle-button.component.css',
  host: {
    "[class.buttonSelected]": "buttonSelected()",
    "[class.buttonNotSelected]": "!buttonSelected()",
    "(click)": "buttonClicked()",
  }
})
export class HeaderToggleButtonComponent {
  /**
   * This property is used to save HeaderToggleButtonType enum, which is necessary to set toggle button types
   * programmatically, display corresponding text and set active toggle button in the parent component.
   */
  protected readonly HeaderToggleButtonType = HeaderToggleButtonType;

  /**
   * This input determines, in which format will this button display temperature. This input also changes button icon
   * to the corresponding text.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button [buttonType]="HeaderToggleButtonType.celsius" />
   */
  buttonType = input.required<HeaderToggleButtonType>();

  /**
   * This input awaits boolean value, which will determine if this button is activated. It is required to change
   * temperature display format.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button [buttonSelected]="false"/>
   */
  buttonSelected = input.required<boolean>();

  /**
   * This event sends out HeaderToggleButtonType value, which programmatically differences toggle buttons and sets
   * temperature format accordingly.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button (onClick)="// Handler Method"/>
   */
  onClick = output<HeaderToggleButtonType>();

  /**
   * This method is used to send current type of the button to the parent component to update temperature format inside
   * the application.
   */
  buttonClicked() {
    this.onClick.emit(this.buttonType());
  }
}
