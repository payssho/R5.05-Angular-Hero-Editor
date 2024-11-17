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
   * Enregistre en base les modifications du hero
   */
  saveHero(): void {
    if (this.hero && this.hero.id) {  // Vérifie que le héros a un ID
      // Crée un objet de mise à jour avec les propriétés modifiées
      const updates: Partial<HeroInterface> = {
        name: this.hero.name,
        attack: this.attack ?? this.hero.attack,
        health: this.health ?? this.hero.health,
        defense: this.defense ?? this.hero.defense,
        favorite: this.hero.favorite // Si vous modifiez la propriété favorite, vous pouvez l'ajouter ici
      };

      // Met à jour le héros dans la base de données
      this.heroService.updateHero(this.hero.id, updates).then(() => {
        this.messageService.add("Modification enregistrée !");
        this.location.back(); // Retour à la page précédente après la mise à jour
      }).catch(error => {
        this.messageService.add("Erreur lors de la mise à jour du héros.");
        console.error(error);
      });
    } else {
      this.messageService.add("Veuillez renseigner un ID de héros valide");
    }
  }



  /**
   * Go back
   */
  back(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }


}
