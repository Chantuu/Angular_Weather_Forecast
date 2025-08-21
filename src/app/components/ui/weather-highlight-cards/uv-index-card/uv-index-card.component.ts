import {Component, input} from '@angular/core';

/**
 * This is UV index card component, which displays UV index data.
 */
@Component({
  selector: 'app-uv-index-card',
  imports: [],
  templateUrl: './uv-index-card.component.html',
  styleUrl: './uv-index-card.component.css'
})
export class UvIndexCardComponent {
  /**
   * This required input awaits number value, which represents current UV index.
   *
   * Usage example:
   * @example
   * <app-uv-index-card [uvIndex]="5" />
   */
  uvIndex = input.required<number>();
}
