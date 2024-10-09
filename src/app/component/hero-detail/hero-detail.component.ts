import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import { Location } from '@angular/common';
import {HerointerfaceService} from "../../services/hero-interface.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    RouterLink
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

  constructor(private heroService: HerointerfaceService, private location: Location, private messageService: MessageService) {}


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId != null) {
      this.heroService.getHero(this.heroId).subscribe(hero => this.hero = hero);
    }
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
}
