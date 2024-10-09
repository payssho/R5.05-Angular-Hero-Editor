import {Component, inject} from '@angular/core';
import {Location, UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HerointerfaceService} from "../../services/hero-interface.service";

@Component({
  selector: 'app-hero-modif',
  standalone: true,
  imports: [
    UpperCasePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hero-modif.component.html',
  styleUrl: './hero-modif.component.css'
})
export class HeroModifComponent {

  //Pour obtenir les infos de la route
  private route = inject(ActivatedRoute);

  //Infos de base
  hero?: HeroInterface;
  heroId?: string | null | undefined;
  totalSkills?: number | undefined;
  attack?: number | undefined;
  health?: number | undefined;
  defense?: number | undefined;

  //Import des services et utils
  constructor(private heroService: HerointerfaceService, private messageService: MessageService, private location: Location) {
  }

  /**
   * INIT
    */
  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId != null) {
      this.heroService.getHero(this.heroId).subscribe(hero => {
        this.hero = hero;
        if (this.hero != undefined) {
          this.totalSkills = 40 - (this.hero.attack + this.hero.health + this.hero.defense);
          this.attack = this.hero.attack || 0;
          this.health = this.hero.health || 0;
          this.defense = this.hero.defense || 0;
        }
      });
    }
  }

  /**
   * Augmente les capacité du héros de 1
   * @param type de capacité
   */  increase(type: string): void {
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
   * Enregistre en base les modification du hero
    */
  saveHero(): void {
    if (this.hero) {
      this.hero.attack = this.attack ?? 0;
      this.hero.health = this.health ?? 0;
      this.hero.defense = this.defense ?? 0;
      this.heroService.updateHero(this.hero)
    }
    this.messageService.add("Modification enregistrée !")
    this.location.back(); // Méthode pour revenir à la page précédente
  }

  /**
   * Go back
   */
  back(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }


}
