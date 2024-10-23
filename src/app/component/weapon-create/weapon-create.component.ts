import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Location, UpperCasePipe } from "@angular/common";
import { WeaponInterface } from "../../data/weaponInterface";
import { WeaponService } from "../../services/weapon.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-weapon-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './weapon-create.component.html',
  styleUrl: './weapon-create.component.css'
})
export class WeaponCreateComponent {

  weapon?: WeaponInterface = {
    id: 0,
    favorite: false,
    name: "",
    damage: 1,
    range: 1,
    speed: 1
  };
  totalPoints: number = 40;
  damage: number = 1;
  range: number = 1;
  speed: number = 1;

  constructor(private weaponService: WeaponService, private messageService: MessageService, private location: Location) {}

  ngOnInit(): void {
    // Initialiser l'arme par défaut si nécessaire
  }

  increase(type: string): void {
    if (this.totalPoints > 0) {
      switch (type) {
        case 'damage':
          this.damage++;
          break;
        case 'range':
          this.range++;
          break;
        case 'speed':
          this.speed++;
          break;
      }
      this.totalPoints--;
    } else {
      this.messageService.add("Les points de compétence sont limités à 40");
    }
  }

  decrease(type: string): void {
    switch (type) {
      case 'damage':
        if (this.damage > 1) {
          this.damage--;
          this.totalPoints++;
        }
        break;
      case 'range':
        if (this.range > 1) {
          this.range--;
          this.totalPoints++;
        }
        break;
      case 'speed':
        if (this.speed > 1) {
          this.speed--;
          this.totalPoints++;
        }
        break;
    }
  }

  saveWeapon(): void {
    if (this.weapon && this.weapon.name) {
      this.weapon.damage = this.damage;
      this.weapon.range = this.range;
      this.weapon.speed = this.speed;
      this.weaponService.addWeapon(this.weapon);
      this.messageService.add("Arme enregistrée avec succès !");
      this.location.back();
    } else {
      this.messageService.add("Veuillez renseigner le nom de l'arme");
    }
  }

  back(): void {
    this.location.back();
  }
}
