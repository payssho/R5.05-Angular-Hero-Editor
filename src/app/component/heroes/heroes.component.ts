import { Component } from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {RouterLink} from "@angular/router";
import {HerointerfaceService} from "../../services/hero-interface.service";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    HeroDetailComponent,
    RouterLink
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

//Les données utiles
export class HeroesComponent {

  //MAIN
  heroes: HeroInterface[] = [];
  selectedHero?: HeroInterface;

  constructor(private heroService: HerointerfaceService, private messageService: MessageService) {}

  //SETUP
  ngOnInit(): void {
    // this.getHeroes();
    this.heroService.getHeroes()
      .subscribe(
        (heroes: HeroInterface[]) => {
          this.heroes = heroes;
        },
        error => {
          console.error("Erreur lors de la récupération des héros :", error);
        }
      );
  }

  //SELECTION D'UN HERO
  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
    this.messageService.add(`${hero.name} est le héro sélectionné.`);
  }

  //Sort heros
  sortHeros(sortMethod: string): void {
    if (!this.heroes || this.heroes.length === 0) {
      return; // Si la liste est vide ou non définie, ne rien faire
    }

    // Trier les héros selon la méthode choisie
    this.heroes.sort((a, b) => {
      if (sortMethod === 'attack') {
        return b.attack - a.attack;
      } else if (sortMethod === 'health') {
        return b.health - a.health;
      } else if (sortMethod === 'defense') {
        return b.defense - a.defense;
      }
      return 0;
    });
  }

}
