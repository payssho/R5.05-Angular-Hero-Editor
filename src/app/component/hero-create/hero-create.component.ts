import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Location, UpperCasePipe} from "@angular/common";
import {HeroService} from "../../services/hero.service";
import {HerointerfaceService} from "../../services/hero-interface.service";
import {MessageService} from "../../services/message.service";
import {HeroInterface} from "../../data/heroInterface";

@Component({
  selector: 'app-hero-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.css'
})
export class HeroCreateComponent {

  hero?: HeroInterface = {
    id: 0,
    name: "",
    attack: 0,
    health: 0,
    defense: 0,
    favorite: false
  };
  totalSkills?: number = 37;
  attack?: number = 1;
  health?: number = 1;
  defense?: number = 1;

  constructor(private heroService: HerointerfaceService, private messageService: MessageService, private location: Location) {
  }

  /**
   * INIT
   */
  ngOnInit(): void {
    //INITIALISER UN HÉROS VIDE DE BASE
  }


  /**
   * Augmente les capacité du héros de 1
   * @param type de capacité
   */
  increase(type: string): void {
    if (this.attack == null || this.health == null || this.defense == null) {
      return;
    }
    switch (type) {
      case 'attack':
        // @ts-ignore
        if (this.totalSkills > 0) {  // Empêche la valeur de dépasser 40
          this.attack++;
          // @ts-ignore
          this.totalSkills --;
        } else {
          this.messageService.add("Les points de compétence sont limités à 40");
        }
        break;
      case 'health':
        // @ts-ignore
        if (this.totalSkills > 0) {  // Empêche la valeur de dépasser 40
          this.health++;
          // @ts-ignore
          this.totalSkills --;
        } else {
          this.messageService.add("Les points de compétence sont limités à 40");
        }
        break;
      case 'defense':
        // @ts-ignore
        if (this.totalSkills > 0) {  // Empêche la valeur de dépasser 40
          this.defense++;
          // @ts-ignore
          this.totalSkills --;
        } else {
          this.messageService.add("Les points de compétence sont limités à 40");
        }
        break;
      default:
        break;
    }
  }

  /**
   * Diminue les capacité du héros de 1
   * @param type de capacité
   */  decrease(type: string): void {
    if (this.attack == null || this.health == null || this.defense == null) {
      return;
    }

    switch (type) {
      case 'attack':
        // @ts-ignore
        if (this.attack > 1) {  // Empêche la valeur d'être négative
          this.attack--;
          // @ts-ignore
          this.totalSkills ++;
        } else {
          this.messageService.add("Une compétence ne peut pas être < 1")
        }
        break;
      case 'health':
        // @ts-ignore
        if (this.health > 1) {  // Empêche la valeur d'être négative
          this.health--;
          // @ts-ignore
          this.totalSkills ++;
        } else {
          this.messageService.add("Une compétence ne peut pas être < 1")
        }
        break;
      case 'defense':
        if (this.defense > 1) {  // Empêche la valeur d'être négative
          this.defense--;
          // @ts-ignore
          this.totalSkills ++;
        } else {
          this.messageService.add("Une compétence ne peut pas être < 1")
        }
        break;
      default:
        break;
    }
  }

  /**
   * Enregistre en base la création du hero
   */
  saveHero(): void {
    if (this.hero && this.hero.name) {
      this.hero.attack = this.attack ?? 0;
      this.hero.health = this.health ?? 0;
      this.hero.defense = this.defense ?? 0;
      this.heroService.addHero(this.hero)
      this.messageService.add("Modification enregistrée !");
      this.location.back(); // Méthode pour revenir à la page précédente
    } else {
      this.messageService.add("Veuillez renseigner le nom du héro");
    }
  }

  /**
   * Go back
   */
  back(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }

}
