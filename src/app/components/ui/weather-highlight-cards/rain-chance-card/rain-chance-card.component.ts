import {Component, input} from '@angular/core';

@Component({
  selector: 'app-rain-chance-card',
  imports: [],
  templateUrl: './rain-chance-card.component.html',
  styleUrl: './rain-chance-card.component.css'
})
export class RainChanceCardComponent {
  /**
   * This required input awaits a rain chance value of number type to be displayed inside the component.
   *
   * Usage example:
   * @example
   * <app-rain-chance-card [rainChance]="22" />
   */
  rainChance = input.required<number>();
}
