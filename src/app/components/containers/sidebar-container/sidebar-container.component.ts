import {Component, signal} from '@angular/core';
import {SidebarButtonComponent} from "../../ui/sidebar-button/sidebar-button.component";
import {SidebarButtonType} from "../../../utilities/enums/sidebar-button.enum";
import {WeatherTabComponent} from "../../ui/weather-tab/weather-tab.component";
import {AboutTabComponent} from "../../ui/about-tab/about-tab.component";
import {CitySearchBarComponent} from "../../ui/city-search-bar/city-search-bar.component";

@Component({
  selector: 'app-sidebar-container',
  imports: [SidebarButtonComponent, WeatherTabComponent, AboutTabComponent, CitySearchBarComponent],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.css'
})
export class SidebarContainerComponent {
  // This enum property was declared to be used inside component template to properly manage sidebar button components.
  readonly SidebarButtonType = SidebarButtonType;

  /**
   * This Signal saves which sidebar button was clicked to display corresponding tab in the sidebar.
   */
  currentSidebarButtonPressed = signal<SidebarButtonType>(SidebarButtonType.Weather);

  /**
   * This function is responsible for updating currentSidebarButtonPressed signal which allows to switch between
   * different tabs in the sidebar.
   *
   * @param currentButtonPressed - Parameter containing which sidebar button was clicked
   */
  setActiveSidebarButton(currentButtonPressed: SidebarButtonType) {
    this.currentSidebarButtonPressed.set(currentButtonPressed);
  }
}
