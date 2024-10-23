import { Component } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WeaponInterface} from "../../data/weaponInterface";
import {WeaponService} from "../../services/weapon.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent {

  //MAIN
  weapons: WeaponInterface[] = [];
  selectedWeapon?: WeaponInterface;

  constructor(private weaponService: WeaponService, private messageService: MessageService) {}

  //SETUP
  ngOnInit(): void {
    this.weaponService.getWeapons()
      .subscribe(
        (weapons: WeaponInterface[]) => {
          this.weapons = weapons;
        },
        error => {
          console.error("Erreur lors de la récupération des armes :", error);
        }
      );
  }

  //SELECTION D'UNE ARME
  onSelect(weapon: WeaponInterface): void {
    this.selectedWeapon = weapon;
    this.messageService.add(`${weapon.name} est l'arme sélectionné.`);
  }

}
