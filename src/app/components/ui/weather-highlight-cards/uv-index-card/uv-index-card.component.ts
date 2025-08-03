import {Component, input} from '@angular/core';

@Component({
  selector: 'app-uv-index-card',
  imports: [],
  templateUrl: './uv-index-card.component.html',
  styleUrl: './uv-index-card.component.css'
})
export class UvIndexCardComponent {
  /**
   * This required input awaits uv index value as a number, which will be displayed in the component.
   *
   * Usage example:
   * @example
   * <app-uv-index-card [uvIndex]="5" />
   */
  uvIndex = input.required<number>();
}
