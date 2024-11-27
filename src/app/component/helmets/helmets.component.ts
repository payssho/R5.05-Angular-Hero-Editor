import { Component } from '@angular/core';
import { HelmetInterface } from '../../data/helmetInterface';
import { HelmetService} from "../../services/helmet-service.service";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-helmets',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './helmets.component.html',
  styleUrls: ['./helmets.component.css']
})
export class HelmetsComponent {
  helmets: HelmetInterface[] = [];
  selectedHelmet?: HelmetInterface;

  constructor(private helmetService: HelmetService) {}

  // Initialisation
  ngOnInit(): void {
    this.helmetService.getHelmets()
      .subscribe(
        (helmets: HelmetInterface[]) => {
          this.helmets = helmets;
        },
        error => {
          console.error("Erreur lors de la récupération des casques :", error);
        }
      );
  }

  // Sélection d'un casque
  onSelect(helmet: HelmetInterface): void {
    this.selectedHelmet = helmet;
  }
}
