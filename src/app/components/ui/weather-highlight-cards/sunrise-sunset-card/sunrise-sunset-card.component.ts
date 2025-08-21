import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sunrise-sunset-card',
  imports: [],
  templateUrl: './sunrise-sunset-card.component.html',
  styleUrl: './sunrise-sunset-card.component.css'
})
export class SunriseSunsetCardComponent {
  /**
   * This required input awaits Date object, which represents sunrise time.
   *
   * Usage example:
   * @example
   * <app-sunrise-sunset-card [sunriseTime]="someDateProp" />
   */
  sunriseTime = input.required<Date>();

  /**
   * This required input awaits Date object, which represents sunset time.
   *
   * Usage example:
   * @example
   * <app-sunrise-sunset-card [sunsetTime]="someDateProp" />
   */
  sunsetTime = input.required<Date>();
}
