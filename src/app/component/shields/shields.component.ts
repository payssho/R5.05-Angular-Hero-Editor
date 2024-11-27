import { Component } from '@angular/core';
import { ShieldInterface } from '../../data/shieldInterface';
import { ShieldService } from '../../services/shield-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shields',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './shields.component.html',
  styleUrls: ['./shields.component.css']
})
export class ShieldsComponent {
  shields: ShieldInterface[] = [];
  selectedShield?: ShieldInterface;

  constructor(private shieldService: ShieldService) {}

  // Initialisation
  ngOnInit(): void {
    this.shieldService.getShields()
      .subscribe(
        (shields: ShieldInterface[]) => {
          this.shields = shields;
        },
        error => {
          console.error("Erreur lors de la récupération des boucliers :", error);
        }
      );
  }

  // Sélection d'un bouclier
  onSelect(shield: ShieldInterface): void {
    this.selectedShield = shield;
  }
}
