import {Injectable} from '@angular/core';
import {HEROES} from "../data/mock-heroes";
import {HeroInterface} from "../data/heroInterface";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {doc} from "@angular/fire/firestore";
import {FieldValue} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<HeroInterface[]> {
    this.messageService.add("Héros récupérés !")
    return of(HEROES);
  }

  getHeroById(id: string | FieldValue | null | undefined): Observable<HeroInterface | undefined> {
    const hero = HEROES.find(hero => hero.id === id);
    return of(hero);
  }
}
