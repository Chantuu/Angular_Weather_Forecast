import {Component, input} from '@angular/core';

/**
 * This is wind status card component, which displays current wind speed.
 */
@Component({
  selector: 'app-wind-status-card',
  imports: [],
  templateUrl: './wind-status-card.component.html',
  styleUrl: './wind-status-card.component.css'
})
export class WindStatusCardComponent {
  /**
   * This required input awaits number type, which represents current wind speed.
   *
   * Usage example:
   * @example
   * <app-wind-status-card [windStatus]="15" />
   */
  windStatus = input.required<number>()
}
