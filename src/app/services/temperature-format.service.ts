import {Injectable, signal} from '@angular/core';
import {HeaderToggleButtonType} from "../utilities/enums/header-toggle-button-type.enum";

/**
 * This service is used to manage in which format will the temperature be displayed.
 */
@Injectable({
  providedIn: 'root'
})
export class TemperatureFormatService {
  /**
   * This private property manages, in which format will the temperature be displayed.
   */
  private _temperatureFormat =
      signal<HeaderToggleButtonType>(HeaderToggleButtonType.celsius);

  /**
   * This getter method returns currently saved temperature format as a HeaderToggleButtonType enum.
   */
  getTemperatureFormat() {
    return this._temperatureFormat();
  }

  /**
   * This setter method sets desired temperature format, which is used to display temperature in that format.
   * @param format - Desired temperature format as a HeaderToggleButtonType enum.
   */
   setTemperatureFormat(format: HeaderToggleButtonType) {
    console.log(format);
    this._temperatureFormat.set(format);
  }
}
