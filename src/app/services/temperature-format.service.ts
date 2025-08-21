import {Injectable, signal} from '@angular/core';
import {HeaderToggleButtonType} from "../utilities/enums/header-toggle-button-type.enum";

/**
 * This service manages temperature format selection.
 */
@Injectable({
  providedIn: 'root'
})
export class TemperatureFormatService {
  /**
   * This private property manages in which format to display temperature.
   */
  private _temperatureFormat =
      signal<HeaderToggleButtonType>(HeaderToggleButtonType.celsius);

  /**
   * This method returns currently saved temperature format as a HeaderToggleButtonType enum.
   */
  getTemperatureFormat() {
    return this._temperatureFormat();
  }

  /**
   * This setter method sets desired temperature format, which is used to display temperature in that format.
   *
   * @param format - Desired temperature format.
   */
   setTemperatureFormat(format: HeaderToggleButtonType) {
    console.log(format);
    this._temperatureFormat.set(format);
  }
}
