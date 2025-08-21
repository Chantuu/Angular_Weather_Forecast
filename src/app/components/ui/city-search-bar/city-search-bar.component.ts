import {Component, inject, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

/**
 * This component is search bar used to search for cities and retrieve corresponding weather data.
 */
@Component({
  selector: 'app-city-search-bar',
  imports: [FormsModule],
  templateUrl: './city-search-bar.component.html',
  styleUrl: './city-search-bar.component.css'
})
export class CitySearchBarComponent {
  // region Component Signals
  /**
   * This signal is used to save text input element content.
   */
  inputText = signal<string>("");
  // endregion


  // region Component Outputs
  /**
   * This event emits text input element content to the parent container.
   */
  onSubmit = output<string>();
  // endregion


  // region Component Methods
  /**
   * This function is responsible for validating and sending text input content to parent
   * container.
   */
  async onSubmitPerform() {
    if (!this.inputText()) {
      alert("Please enter a valid city name");
    }
    else {
      this.onSubmit.emit(this.inputText());
    }
  }
  // endregion
}
