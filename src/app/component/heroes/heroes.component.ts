import { Component } from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {RouterLink} from "@angular/router";
import {HerointerfaceService} from "../../services/hero-interface.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    HeroDetailComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

//Les données utiles
export class HeroesComponent {

  heroes: HeroInterface[] = [];
  filteredHeroes: HeroInterface[] = [];
  selectedHero?: HeroInterface;

  filterName: string = ''; // Variable pour stocker le filtre

  constructor(private heroService: HerointerfaceService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(
        (heroes: HeroInterface[]) => {
          this.heroes = heroes;
          this.filteredHeroes = [...heroes]; // Initialiser la liste filtrée
        },
        error => {
          console.error("Erreur lors de la récupération des héros :", error);
        }
      );
  }

  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
    this.messageService.add(`${hero.name} est le héro sélectionné.`);
  }

  sortHeros(sortMethod: string): void {
    if (!this.heroes || this.heroes.length === 0) {
      return;
    }

    this.filteredHeroes.sort((a, b) => {
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

  filterHeroesByName(): void {
    const filter = this.filterName.trim().toLowerCase();
    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(filter)
    );
  }
}
