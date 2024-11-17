import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass, UpperCasePipe } from "@angular/common";
import { WeaponInterface } from "../../data/weaponInterface";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { WeaponService } from "../../services/weapon.service";
import { Location } from '@angular/common';
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-weapon-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent {

  // Pour obtenir les infos de la route
  private route = inject(ActivatedRoute);

  // Infos de base
  weaponId: string | null | undefined;
  weapon?: WeaponInterface;
  isFavorite: boolean | undefined; // Étoile non favorite par défaut

  constructor(private weaponService: WeaponService, private location: Location, private messageService: MessageService) {}

  ngOnInit(): void {
    this.weaponId = this.route.snapshot.paramMap.get('id');
    if (this.weaponId != null) {
      this.weaponService.getWeapon(this.weaponId).subscribe(weapon => {
        this.weapon = weapon;
        this.isFavorite = this.weapon?.favorite;
      });
    }
  }

  /**
   * Retourne sur la page précédente
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Supprime une arme
   */
  delete(): void {
    if (this.weaponId != null) {
      this.weaponService.deleteWeapon(this.weaponId);
      this.messageService.add("Arme supprimée.");
    }
  }

  /**
   * Met ou enlève l'arme des favoris
   */
  updateFavorite(): void {
    this.isFavorite = !this.isFavorite; // Inverse l'état de l'étoile
    if (this.weapon && this.weapon.id) {
      // Mise à jour du champ favorite uniquement
      const updates: Partial<WeaponInterface> = {
        favorite: this.isFavorite
      };

      this.weaponService.updateWeapon(this.weapon.id, updates).then(() => {
        this.messageService.add(this.isFavorite ? "Arme ajoutée aux favoris" : "Arme enlevée des favoris");
      }).catch(error => {
        this.messageService.add("Erreur lors de la mise à jour des favoris.");
        console.error(error);
      });
    } else {
      this.messageService.add("ID de l'arme non valide.");
    }
  }

}
