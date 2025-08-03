import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sunrise-sunset-card',
  imports: [],
  templateUrl: './sunrise-sunset-card.component.html',
  styleUrl: './sunrise-sunset-card.component.css'
})
export class SunriseSunsetCardComponent {
  /**
   * This required input awaits sunrise time value as a Date type, which will be displayed inside the component
   *
   * Usage example:
   * @example
   * <app-sunrise-sunset-card [sunriseTime]="someDateProp" />
   */
  sunriseTime = input.required<Date>();

  /**
   * This required input awaits sunset time value as a Date type, which will be displayed inside the component
   *
   * Usage example:
   * @example
   * <app-sunrise-sunset-card [sunsetTime]="someDateProp" />
   */
  sunsetTime = input.required<Date>();
}
