import {effect, Injectable, signal} from '@angular/core';
import {HeaderToggleButtonType} from "../utilities/enums/header-toggle-button-type.enum";
import {getValueFromLocalStorage, saveValueToLocalStorage} from "../utilities/functions/storage-manager.function";

/**
 * This service manages temperature format selection.
 */
@Injectable({
  providedIn: 'root'
})
export class TemperatureFormatService {
  constructor() {
      effect(() => {
          // Automatically update value every time corresponding signal changes
          saveValueToLocalStorage(this._localStorageKey, this._temperatureFormat());
      });
  }

  /**
   * This private field saves localstorage key, used to save currently clicked toggle button type in browser's local
   * storage.
   */
  private _localStorageKey = 'temperature-format';

  /**
   * This private property manages in which format to display temperature.
   */
  private _temperatureFormat =  signal<HeaderToggleButtonType>
  (getValueFromLocalStorage<HeaderToggleButtonType>(this._localStorageKey) || HeaderToggleButtonType.celsius);

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
