import {Component, inject} from '@angular/core';
import {Location, UpperCasePipe} from "@angular/common";
import {WeaponInterface} from "../../data/weaponInterface";
import {WeaponService} from "../../services/weapon.service";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-weapon-modif',
  standalone: true,
  imports: [
    UpperCasePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './weapon-modif.component.html',
  styleUrl: './weapon-modif.component.css'
})
export class WeaponModifComponent {

  // Pour obtenir les infos de la route
  private route = inject(ActivatedRoute);

  // Infos de base
  weapon?: WeaponInterface;
  weaponId?: string | null | undefined;
  totalStats?: number | undefined;
  damage?: number | undefined;
  range?: number | undefined;
  speed?: number | undefined;

  // Import des services et utils
  constructor(private weaponService: WeaponService, private messageService: MessageService, private location: Location) {
  }

  /**
   * INIT
   */
  ngOnInit() {
    this.weaponId = this.route.snapshot.paramMap.get('id');
    if (this.weaponId != null) {
      this.weaponService.getWeapon(this.weaponId).subscribe(weapon => {
        this.weapon = weapon;
        if (this.weapon != undefined) {
          this.totalStats = 0 - (this.weapon.damage + this.weapon.range + this.weapon.speed);
          this.damage = this.weapon.damage || 0;
          this.range = this.weapon.range || 0;
          this.speed = this.weapon.speed || 0;
        }
      });
    }
  }

  /**
   * Augmente les caractéristiques de l'arme de 1
   * @param type de caractéristique
   */
  increase(type: string): void {
    if (this.damage == null || this.range == null || this.speed == null) {
      return;
    }

    switch (type) {
      case 'damage':
        if (this.damage < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.damage++;
          this.totalStats!++;
        } else {
          this.messageService.add("Les dégâts ne peuvent pas dépasser 5 ou plus de points disponibles");
        }
        break;

      case 'range':
        if (this.range < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.range++;
          this.totalStats!++;
        } else {
          this.messageService.add("La portée ne peut pas dépasser 5 ou plus de points disponibles");
        }
        break;

      case 'speed':
        if (this.speed < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.speed++;
          this.totalStats!++;
        } else {
          this.messageService.add("La vitesse ne peut pas dépasser 5 ou plus de points disponibles");
        }
        break;

      default:
        break;
    }
  }

  /**
   * Diminue les caractéristiques de l'arme de 1
   * @param type de caractéristique
   */
  decrease(type: string): void {
    if (this.damage == null || this.range == null || this.speed == null) {
      return;
    }

    switch (type) {
      case 'damage':
        if (this.damage > -5) {  // Limite à -5
          this.damage--;
          this.totalStats!--;
        } else {
          this.messageService.add("Les dégâts ne peuvent pas être inférieurs à -5");
        }
        break;

      case 'range':
        if (this.range > -5) {  // Limite à -5
          this.range--;
          this.totalStats!--;
        } else {
          this.messageService.add("La portée ne peut pas être inférieure à -5");
        }
        break;

      case 'speed':
        if (this.speed > -5) {  // Limite à -5
          this.speed--;
          this.totalStats!--;
        } else {
          this.messageService.add("La vitesse ne peut pas être inférieure à -5");
        }
        break;

      default:
        break;
    }
  }


  /**
   * Enregistre en base les modifications de l'arme
   */
  saveWeapon(): void {
    if (this.totalStats === 0) {
      if (this.weapon) {
        this.weapon.damage = this.damage ?? 0;
        this.weapon.range = this.range ?? 0;
        this.weapon.speed = this.speed ?? 0;
        this.weaponService.updateWeapon(this.weapon);
      }
      this.messageService.add("Modification enregistrée !");
      this.location.back();
    } else {
      this.messageService.add("La somme de l’attaque, vitesse et portée doit être égale à 0 !");
    }

  }

  /**
   * Retour
   */
  back(): void {
    this.location.back();
  }
}
