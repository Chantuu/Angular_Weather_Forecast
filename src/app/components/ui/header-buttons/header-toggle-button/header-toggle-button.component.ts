import {Component, input, output} from '@angular/core';
import {HeaderToggleButtonType} from "../../../../utilities/enums/header-toggle-button-type.enum";

/**
 * This component is toggle button, which is configurable to display corresponding temperature format.
 */
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
  // region Component Inputs and Declared Types
  /**
   * This property saves HeaderToggleButtonType Enum, which is used inside component's property.
   */
  protected readonly HeaderToggleButtonType = HeaderToggleButtonType;

  /**
   * This input awaits HeaderToggleButtonType Enum, determining in which format to display temperature.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button [buttonType]="HeaderToggleButtonType.celsius" />
   */
  buttonType = input.required<HeaderToggleButtonType>();

  /**
   * This input awaits boolean value, determining if this button is selected.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button [buttonSelected]="false"/>
   */
  buttonSelected = input.required<boolean>();
  // endregion


  //  region Component Outputs
  /**
   * This event emits HeaderToggleButtonType value, which programmatically differences toggle buttons and sets
   * temperature format accordingly.
   *
   * Usage example:
   * @example
   * <app-header-toggle-button (onClick)="// Handler Method"/>
   */
  onClick = output<HeaderToggleButtonType>();
  // endregion


  // region Component Methods
  /**
   * This method sends currently saved HeaderToggleButtonType value to the parent component, which updates temperature
   * format.
   */
  buttonClicked() {
    this.onClick.emit(this.buttonType());
  }
  // endregion
}
