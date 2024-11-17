import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import { Location } from '@angular/common';
import {HerointerfaceService} from "../../services/hero-interface.service";
import {MessageService} from "../../services/message.service";
import {WeaponInterface} from "../../data/weaponInterface";
import {WeaponService} from "../../services/weapon.service";
import {deleteField} from "@angular/fire/firestore";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {

  //Pour obtenir les infos de la route
  private route = inject(ActivatedRoute);

  //Infos de base
  heroId: string | null | undefined;
  hero?: HeroInterface;
  isFavorite: boolean | undefined; // Étoile non favorite par défaut
  availableWeapons: WeaponInterface[] = [];
  selectedWeaponId: string | undefined;
  currentWeapon: WeaponInterface | undefined;

  constructor(private heroService: HerointerfaceService, private location: Location, private messageService: MessageService, private weaponService: WeaponService) {}


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId != null) {
      this.heroService.getHero(this.heroId).subscribe(hero => {
        this.hero = hero
        this.isFavorite = this.hero?.favorite;
        if (this.hero?.weaponId) {
          this.weaponService.getWeaponById(this.hero.weaponId).subscribe({
            next: (weapon: WeaponInterface) => {
              this.currentWeapon = weapon;
              this.selectedWeaponId = this.currentWeapon.id;
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de l\'arme :', err);
            }
          });
        }
      });
    }
    this.weaponService.getAvailableWeapons().subscribe(weapons => {
      this.availableWeapons = weapons;
    });
  }

  /**
   * Retourne sur la page précédente
   */
  goBack(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }

  /**
   * Supprime un hero
   */
  delete () {
    if (this.heroId != null) {
      this.heroService.deleteHero(this.heroId);
      this.messageService.add("Héro supprimé.")
    }
  }

  /**
   * Met ou enlève le héros des favoris
   */
  updateFavorite(): void {
    if (!this.hero) return;

    // Inverse l'état de l'étoile
    this.isFavorite = !this.isFavorite;

    // Met à jour le héros dans la base de données
    this.heroService.updateHero(this.hero.id, {favorite: this.isFavorite}).then(() => {
      const message = this.isFavorite
        ? "Héros ajouté dans les favoris"
        : "Héros enlevé des favoris";
      this.messageService.add(message);
    });
  }

  /**
   * Permet de définir l'arme séléctionnée et de gérer les exceptions
   * @param weapon
   */
  onSelect(weapon: WeaponInterface) : void {
    this.unassignWeapon();
    // @ts-ignore
    if (weapon.damage + this.hero?.attack < 1) {
      this.messageService.add("Impossible d'ajouter cette arme, l'attaque ne peut pas être négative")
      return;
    }
    this.selectedWeaponId = weapon.id;
    this.currentWeapon = weapon;
    this.messageService.add("Arme ajoutée au héro")
    this.assignWeapon();
  }


  /**
   * Permet d'assigner en base une arme à un hero
   */
  assignWeapon(): void {
    if (!this.selectedWeaponId || !this.hero) return;

    const heroId = this.hero.id;
    const weaponId = this.selectedWeaponId;

    // Met à jour le héros avec l'arme choisie
    this.heroService.updateHero(heroId, { weaponId }).then(() => {
      // Met à jour l'arme pour indiquer qu'elle est assignée
      this.weaponService.updateWeapon(weaponId, { assignedTo: heroId }).then(() => {
        console.log('Arme assignée avec succès');
      });
    }).catch((error) => {
      console.error('Erreur lors de l\'assignation de l\'arme :', error);
    });
  }
  /**
   * Permet de retirer l'arme du héros
   */
  unassignWeapon(): void {
    if (!this.selectedWeaponId) {
      this.messageService.add("Aucune arme n'est sélectionnée pour être désassignée.");
      return;
    }

    // Appeler le service pour mettre à jour le champ `assignedTo` de l'arme
    this.weaponService.updateWeapon(this.selectedWeaponId, { assignedTo: deleteField() })
      .then(() => {
        // Ensuite, mettre à jour le héros pour supprimer l'ID de l'arme
        if (this.hero && this.hero.weaponId) {
          this.heroService.updateHero(this.hero.id, { weaponId: deleteField() })
            .then(() => {
              this.messageService.add("L'arme a été désassignée du héros avec succès.");
              // Réinitialiser localement les données si nécessaire
              this.selectedWeaponId = undefined;
              this.currentWeapon = undefined;
            })
            .catch((error) => {
              this.messageService.add("Une erreur est survenue lors de la désassignation de l'arme du héros : " + error.message);
            });
        }
      })
      .catch((error) => {
        this.messageService.add("Une erreur est survenue lors de la désassignation de l'arme : " + error.message);
      });
  }


  heroSelect() {
    this.messageService.add("Fonctionnalité à ajouter !")
  }
}
