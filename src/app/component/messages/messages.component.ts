import { Component } from '@angular/core';
import { HeroesComponent} from "../heroes/heroes.component";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    HeroesComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {
  }
}
