import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: string = "";

  //Remplace le message existant
  add(message: string) {
    this.clear();
    this.message = message;
  }

  //Efface le message
  clear() {
    this.message = "";
  }
}
