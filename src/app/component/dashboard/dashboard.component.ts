import { Component } from '@angular/core';
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeroDetailComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes: HeroInterface[] | undefined;
  selectedHero?: HeroInterface;
  topHeroes: HeroInterface[] | undefined;

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
    this.topHeroes = this.heroes?.slice(0, 4);
  }

}
