import { Component } from '@angular/core';
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {RouterLink} from "@angular/router";
import {HerointerfaceService} from "../../services/hero-interface.service";
import {WeaponService} from "../../services/weapon.service";
import {WeaponInterface} from "../../data/weaponInterface";

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

  //For heroes
  heroes: HeroInterface[] | undefined;
  selectedHero?: HeroInterface;
  topHeroes: HeroInterface[] | undefined;

  //For weapons
  weapons: WeaponInterface[] | undefined;
  selectedWeapon?: WeaponInterface;
  topWeapons: WeaponInterface[] | undefined;



  constructor(private heroService: HerointerfaceService, private weaponService: WeaponService, private messageService: MessageService) {}

  //SETUP
  ngOnInit(): void {
    // this.getHeroes();
    this.heroService.getHeroes()
      .subscribe(
        (heroes: HeroInterface[]) => {
          this.heroes = heroes;
          this.topHeroes = [];
          this.heroes.forEach(heroe => {
            if (heroe.favorite && this.topHeroes !== undefined) {
              this.topHeroes.push(heroe);
            }
          })
        },
        error => {
          console.error("Erreur lors de la récupération des héros :", error);
        }
      );

    // this.getHeroes();
    this.weaponService.getWeapons()
      .subscribe(
        (weapons: WeaponInterface[]) => {
          this.weapons = weapons;
          this.topWeapons = [];
          this.weapons.forEach(weapon => {
            if (weapon.favorite && this.topWeapons !== undefined) {
              this.topWeapons.push(weapon);
            }
          })
        },
        error => {
          console.error("Erreur lors de la récupération des armes :", error);
        }
      );
  }

  //SELECTION D'UN HERO
  onSelectHero(hero: HeroInterface): void {
    this.selectedHero = hero;
    this.messageService.add(`${hero.name} est le héro sélectionné.`);
  }

  //SELECTION D'UNe arme
  onSelectWeapon(weapon: WeaponInterface): void {
    this.selectedWeapon = weapon;
    this.messageService.add(`${weapon.name} est l'arme sélectionnée.`);
  }
}
