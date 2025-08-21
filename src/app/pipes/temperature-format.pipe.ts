import { Pipe, PipeTransform } from '@angular/core';
import {TemperatureFormatService} from "../services/temperature-format.service";
import {HeaderToggleButtonType} from "../utilities/enums/header-toggle-button-type.enum";

/**
 * This pipe displays temperature in Celsius or Fahrenheit based on certain conditions. TemperatureFormatService is
 * used for full functionality implementation.
 */
@Pipe({
  name: 'temperatureFormat',
  pure: false
})
export class TemperatureFormatPipe implements PipeTransform {
  constructor(private readonly temperatureFormatService: TemperatureFormatService) {
  }

  transform(value: number): string {
    if (this.temperatureFormatService.getTemperatureFormat() === HeaderToggleButtonType.fahrenheit) {
      return `${Math.round(((value * (9 / 5)) + 32) * 10) / 10}℉`; // Fahrenheit is rounded to 1 decimal
    } else {
      return `${value}℃`;
    }
  }
}
