import { Component } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WeaponInterface} from "../../data/weaponInterface";
import {WeaponService} from "../../services/weapon.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent {
  weapons: WeaponInterface[] = [];
  filteredWeapons: WeaponInterface[] = [];
  selectedWeapon?: WeaponInterface;
  filterName: string = ''; // Champ de recherche

  constructor(private weaponService: WeaponService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.weaponService.getWeapons().subscribe(
      (weapons: WeaponInterface[]) => {
        this.weapons = weapons;
        this.filteredWeapons = weapons; // Initialiser la liste filtrée
      },
      error => {
        console.error("Erreur lors de la récupération des armes :", error);
      }
    );
  }

  onSelect(weapon: WeaponInterface): void {
    this.selectedWeapon = weapon;
    this.messageService.add(`${weapon.name} est l'arme sélectionnée.`);
  }

  sortWeapon(sortMethod: string): void {
    if (!this.weapons || this.weapons.length === 0) {
      return; // Si la liste est vide ou non définie, ne rien faire
    }

    this.filteredWeapons.sort((a, b) => {
      if (sortMethod === 'damage') {
        return b.damage - a.damage;
      } else if (sortMethod === 'range') {
        return b.range - a.range;
      } else if (sortMethod === 'speed') {
        return b.speed - a.speed;
      }
      return 0;
    });
  }

  // Méthode pour filtrer les armes par nom
  filterWeapons(): void {
    const filter = this.filterName.toLowerCase().trim();
    this.filteredWeapons = this.weapons.filter(weapon =>
      weapon.name.toLowerCase().includes(filter)
    );
  }
}
