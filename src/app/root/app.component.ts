import { Component } from '@angular/core';
import {SidebarContainerComponent} from "../components/containers/sidebar-container/sidebar-container.component";
import {MainContainerComponent} from "../components/containers/main-container/main-container.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    SidebarContainerComponent,
    MainContainerComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
}
