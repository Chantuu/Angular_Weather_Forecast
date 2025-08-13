import { Pipe, PipeTransform } from '@angular/core';
import {TemperatureFormatService} from "../services/temperature-format.service";
import {HeaderToggleButtonType} from "../utilities/enums/header-toggle-button-type.enum";

/**
 * This pipe is used to display temperature in Celsius or in Fahrenheit. TemperatureFormatService is used to display
 * temperature conditionally in either of these formats.
 */
@Pipe({
  name: 'temperatureFormat',
  pure: false
})
export class TemperatureFormatPipe implements PipeTransform {
  constructor(private readonly temperatureFormatService: TemperatureFormatService) {
  }

  transform(value: number): string {
    console.log(this.temperatureFormatService.getTemperatureFormat());
    if (this.temperatureFormatService.getTemperatureFormat() === HeaderToggleButtonType.fahrenheit) {
      return `${Math.round(((value * (9 / 5)) + 32) * 10) / 10}℉`; // Fahrenheit is rounded to 1 decimal
    } else {
      return `${value}℃`;
    }
  }
}
