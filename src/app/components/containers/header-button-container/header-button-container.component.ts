import {Component, signal} from '@angular/core';
import {HeaderToggleButtonComponent} from "../../ui/header-buttons/header-toggle-button/header-toggle-button.component";
import {HeaderToggleButtonType} from "../../../utilities/enums/header-toggle-button-type.enum";
import {
  HeaderFavoriteButtonComponent
} from "../../ui/header-buttons/header-favorite-button/header-favorite-button.component";
import {TemperatureFormatService} from "../../../services/temperature-format.service";

@Component({
  selector: 'app-header-button-container',
  imports: [
    HeaderToggleButtonComponent,
    HeaderFavoriteButtonComponent,
  ],
  templateUrl: './header-button-container.component.html',
  styleUrl: './header-button-container.component.css'
})
export class HeaderButtonContainerComponent {
  constructor(private temperatureFormatService: TemperatureFormatService) {}

  /**
   * This property contains HeaderToggleButtonType type, which is necessary to use it inside the component's template.
   */
  protected readonly HeaderToggleButtonType = HeaderToggleButtonType;

  /**
   * This signal is used to manage which toggle button is currently active, which in turn determines, which format is
   * used to display temperature.
   */
  protected currentActiveButton =
      signal<HeaderToggleButtonType>(HeaderToggleButtonType.celsius);

  /**
   * This function is used to set currently clicked toggle button as an active button, which will be used to set
   * corresponding temperature format.
   *
   * @param buttonType - Which toggle button was recently clicked
   */
  toggleButtonClicked(buttonType: HeaderToggleButtonType) {
    this.currentActiveButton.set(buttonType);
    this.temperatureFormatService.setTemperatureFormat(buttonType);
  }
}
