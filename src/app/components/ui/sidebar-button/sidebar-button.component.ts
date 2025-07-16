import {Component, input, output} from '@angular/core';
import {NgStyle} from "@angular/common";
import {SidebarButtonType} from "../../../utilities/enums/sidebar-button.enum";

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
  /**
   * This required input awaits desired icon name, which will be displayed inside button icon.
   * Note: that this icon must be located inside src/assets/button_Icons folder to properly
   * use and display this icon.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button iconName="yourPathName">Some Text<button />
   */
  iconName = input.required<string>();

  /**
   * This required input is responsible for changing button styling, when its corresponding tab is open
   * inside sidebar.
   *
   * Note: This property must be managed by parent component.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button [buttonTabActive]="true">Some Text<button />
   */
  buttonTabActive = input.required<boolean>();

  /**
   * This required input is necessary to programmatically identify individual sidebar button,
   * which is necessary to display correct sidebar tab accordingly.
   *
   * Note: This property must be managed by parent component.
   *
   * Usage example:
   * @example
   * <button app-sidebar-button [buttonType]="SidebarButtonType.About">Some Text<button />
   */
  buttonType = input.required<SidebarButtonType>();

  /**
   * This event returns SidebarButtonType enum, which is used to identify, which sidebar button was clicked and
   * display corresponding tab in sidebar
   */
  onClick = output<SidebarButtonType>();

  /**
   * This function is responsible for generating and returning correct mask image url, where input icon is
   * dynamically injected and allows to display and manipulate desired icon. This is applicable when using
   * mask-image rule.
   */
  getMaskImage() {
    const url = `/assets/button_Icons/${this.iconName()}.svg`;
    return `url(${url})`;
  }

  /**
   * This method is responsible for emitting SidebarButtonType enum value, which is used by parent component
   * to identify programmatically, which sidebar button was clicked.
   */
  buttonClicked() {
    this.onClick.emit(this.buttonType());
  }
}
