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
import {HelmetService} from "../../services/helmet-service.service";
import {ShieldService} from "../../services/shield-service.service";
import {HelmetInterface} from "../../data/helmetInterface";
import {ShieldInterface} from "../../data/shieldInterface";

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
  currentWeapon: WeaponInterface | undefined | null;
  availableHelmets: HelmetInterface[] = [];
  selectedHelmetId: string | undefined;
  currentHelmet: HelmetInterface | undefined | null;
  availableShields: ShieldInterface[] = [];
  selectedShieldsId: string | undefined;
  currentShields: ShieldInterface | undefined | null;

  constructor(private heroService: HerointerfaceService, private location: Location, private messageService: MessageService, private weaponService: WeaponService
  , private helmetService: HelmetService, private shieldService: ShieldService) {}


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
          this.shieldService.getShieldById(this.hero.shieldId).subscribe({
            next: (shield: ShieldInterface) => {
              this.currentShields = shield;
              this.selectedShieldsId = this.currentShields.id;
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de l\'arme :', err);
            }
          });
          this.helmetService.getHelmetById(this.hero.helmetId).subscribe({
            next: (helmet: HelmetInterface) => {
              this.currentHelmet = helmet;
              this.selectedHelmetId = this.currentHelmet.id;
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
    this.helmetService.getHelmets().subscribe(helmets => {
      this.availableHelmets = helmets;
    });
    this.shieldService.getShields().subscribe(shields => {
      this.availableShields = shields;
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

  /**
   * Permet d'assigner en base une arme à un hero
   */
  assignShield(): void {
    if (!this.selectedShieldsId || !this.hero) return;

    const heroId = this.hero.id;
    const shieldId = this.selectedShieldsId;

    // Met à jour le héros avec l'arme choisie
    this.heroService.updateHero(heroId, { shieldId }).then(() => {
      // Met à jour l'arme pour indiquer qu'elle est assignée
      this.shieldService.updateShield(shieldId, { assignedTo: heroId }).then(() => {
      });
    }).catch((error) => {
      console.error('Erreur lors de l\'assignation du bouclier :', error);
    });
  }
  /**
   * Permet de retirer l'arme du héros
   */
  unassignShield(): void {
    if (!this.selectedShieldsId) {
      this.messageService.add("Aucun bouclier n'est sélectionnée pour être désassignée.");
      return;
    }

    // Appeler le service pour mettre à jour le champ `assignedTo` de l'arme
    this.shieldService.updateShield(this.selectedShieldsId, { assignedTo: deleteField() })
      .then(() => {
        // Ensuite, mettre à jour le héros pour supprimer l'ID de l'arme
        if (this.hero && this.hero.shieldId) {
          this.heroService.updateHero(this.hero.id, { shieldId: deleteField() })
            .then(() => {
              this.messageService.add("Le bouclier a été désassignée du héros avec succès.");
              // Réinitialiser localement les données si nécessaire
              this.selectedShieldsId = undefined;
              this.currentShields = undefined;
            })
            .catch((error) => {
              this.messageService.add("Une erreur est survenue lors de la désassignation du bouclier du héros : " + error.message);
            });
        }
      })
      .catch((error) => {
        this.messageService.add("Une erreur est survenue lors de la désassignation du bouclier : " + error.message);
      });
  }

  /**
   * Permet d'assigner en base une arme à un hero
   */
  assignHelmet(): void {
    if (!this.selectedHelmetId || !this.hero) return;

    const heroId = this.hero.id;
    const helmetId = this.selectedHelmetId;

    // Met à jour le héros avec l'arme choisie
    this.heroService.updateHero(heroId, { helmetId }).then(() => {
      // Met à jour l'arme pour indiquer qu'elle est assignée
      this.helmetService.updateHelmet(helmetId, { assignedTo: heroId }).then(() => {
      });
    }).catch((error) => {
      console.error('Erreur lors de l\'assignation du casque :', error);
    });
  }
  /**
   * Permet de retirer l'arme du héros
   */
  unassignHelmet(): void {
    if (!this.selectedHelmetId) {
      this.messageService.add("Aucun casque n'est sélectionnée pour être désassignée.");
      return;
    }

    // Appeler le service pour mettre à jour le champ `assignedTo` de l'arme
    this.helmetService.updateHelmet(this.selectedHelmetId, { assignedTo: deleteField() })
      .then(() => {
        // Ensuite, mettre à jour le héros pour supprimer l'ID de l'arme
        if (this.hero && this.hero.helmetId) {
          this.heroService.updateHero(this.hero.id, { helmetId: deleteField() })
            .then(() => {
              this.messageService.add("Le casque a été désassignée du héros avec succès.");
              // Réinitialiser localement les données si nécessaire
              this.selectedHelmetId = undefined;
              this.currentHelmet = undefined;
            })
            .catch((error) => {
              this.messageService.add("Une erreur est survenue lors de la désassignation du casque du héros : " + error.message);
            });
        }
      })
      .catch((error) => {
        this.messageService.add("Une erreur est survenue lors de la désassignation du casque : " + error.message);
      });
  }


  heroSelect() {
    // @ts-ignore
    this.heroService.updateHero(this.hero.id, { currentHero: true })

    // Récupérer la liste des héros
    this.heroService.getHeroes().subscribe((heroes) => {
      if (!heroes || heroes.length === 0) {
        this.messageService.add("Aucun héros trouvé.");
        return;
      }

      // Parcourir chaque héros
      const updates = heroes.map((hero) => {
        // @ts-ignore
        if (hero.currentHero && hero.id !== this.hero.id) {
          // Mettre à jour le héros pour définir currentHero à false
          return this.heroService.updateHero(hero.id, { currentHero: false })
            .then(() => {
              this.messageService.add(`Le statut de currentHero pour le héros ${hero.name} a été mis à jour.`);
            })
            .catch((error) => {
              this.messageService.add(`Une erreur est survenue lors de la mise à jour du héros ${hero.name} : ${error.message}`);
            });
        }
        return Promise.resolve(); // Pas de mise à jour nécessaire
      });

      // Attendre que toutes les mises à jour soient effectuées
      Promise.all(updates)
        .then(() => {
          this.messageService.add("Le héro a été séléctionné.");
        })
        .catch(() => {
          this.messageService.add("Certaines mises à jour ont échoué.");
        });
    }, (error) => {
      this.messageService.add("Erreur lors de la récupération des héros : " + error.message);
    });
  }

  onSelectHelmet(helmet: HelmetInterface) {
    this.selectedHelmetId = helmet.id;
    this.currentHelmet = helmet;
    this.messageService.add("Casque ajoutée au héro")
    this.assignHelmet();
  }

  onSelectShield(shield: ShieldInterface) {
    this.selectedShieldsId = shield.id;
    this.currentShields = shield;
    this.messageService.add("BOuclier ajoutée au héro")
    this.assignShield();
  }

  /**
   * Permet de définir l'arme séléctionnée et de gérer les exceptions
   * @param weapon
   */
  onSelect(weapon: WeaponInterface) : void {
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
}
