import {Component, input} from '@angular/core';

@Component({
  selector: 'app-wind-status-card',
  imports: [],
  templateUrl: './wind-status-card.component.html',
  styleUrl: './wind-status-card.component.css'
})
export class WindStatusCardComponent {
  /**
   * This required input awaits wind speed value of number type to be displayed inside component.
   *
   * Usage example:
   * @example
   * <app-wind-status-card [windStatus]="15" />
   */
  windStatus = input.required<number>()
}
