import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MessagesComponent} from "./component/messages/messages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'R5.05 Real';
  isDropdownOpen = false;
}
