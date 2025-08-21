import {Component, input, output} from '@angular/core';
import {NgStyle} from "@angular/common";
import {SidebarButtonType} from "../../../utilities/enums/sidebar-button.enum";

/**
 * This is sidebar button component, which is configurable to bind with corresponding sidebar tab.
 */
@Component({
  selector: 'button[app-sidebar-button]',
  imports: [
    NgStyle
  ],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css',
  host: {
    "(click)": "buttonClicked()"
  }
})
export class SidebarButtonComponent {
  // region Component Inputs
  /**
   * This required input awaits desired icon name, which is displayed inside button icon.
   *
   * Note: that this icon must be located inside src/assets/button_Icons folder to properly
   * use and display this icon.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button iconName="yourPathName">Some Text<button />
   */
  iconName = input.required<string>();

  /**
   * This required input awaits boolean value, where if corresponding tab is open, this component is selected.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button [buttonTabActive]="true">Some Text<button />
   */
  buttonTabActive = input.required<boolean>();

  /**
   * This required input awaits SidebarButtonType Enum, programmatically differentiating current button from other
   * sidebar buttons.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button [buttonType]="SidebarButtonType.About">Some Text<button />
   */
  buttonType = input.required<SidebarButtonType>();
  // endregion


  // region Component Outputs
  /**
   * This event emits SidebarButtonType Enum, used to identify which sidebar button was clicked and show corresponding
   * sidebar tab.
   */
  onClick = output<SidebarButtonType>();
  // endregion


  // region Component Methods
  /**
   * This function generates and returns correct mask image url, used to manipulate svg icon using css
   *
   * @returns string - Generated url string of the input icon
   */
  getMaskImage() {
    const url = `/assets/button_Icons/${this.iconName()}.svg`;
    return `url(${url})`;
  }

  /**
   * This handler method emits saved SidebarButtonType Enum value, used by parent component to programmatically identify
   * clicked sidebar button and display corresponding sidebar tab.
   */
  buttonClicked() {
    this.onClick.emit(this.buttonType());
  }
  // endregion
}
