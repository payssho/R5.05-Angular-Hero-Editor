import { Component } from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {RouterLink} from "@angular/router";

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
  heroes: HeroInterface[] | undefined;
  selectedHero?: HeroInterface;

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  //SETUP
  ngOnInit(): void {
    this.getHeroes();
  }

  //SELECTION D'UN HERO
  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
    this.messageService.add(`${hero.name} est le héro sélectionné.`);
  }


  //GETTER
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
