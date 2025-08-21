import {Component, input} from '@angular/core';

/**
 * This is Rain Chance Highlight card component, which displays probability of the rain precipitation.
 */
@Component({
  selector: 'app-rain-chance-card',
  imports: [],
  templateUrl: './rain-chance-card.component.html',
  styleUrl: './rain-chance-card.component.css'
})
export class RainChanceCardComponent {
  /**
   * This required input awaits number value, which tells probability of the precipitation.
   *
   * Usage example:
   * @example
   * <app-rain-chance-card [rainChance]="22" />
   */
  rainChance = input.required<number>();
}
