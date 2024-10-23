import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, UpperCasePipe} from "@angular/common";
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

  constructor(private heroService: HerointerfaceService, private location: Location, private messageService: MessageService) {}


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId != null) {
      this.heroService.getHero(this.heroId).subscribe(hero => {
        this.hero = hero
        this.isFavorite = this.hero?.favorite;
      });
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

  /**
   * Met ou enlève le héro des favoris
   */
  updateFavorite(): void {
    this.isFavorite = !this.isFavorite; // Inverse l'état de l'étoile
    if (this.hero) {
      if (this.isFavorite) {
        this.hero.favorite = this.isFavorite;
        this.heroService.updateHero(this.hero);
        this.messageService.add("Héros ajouté dans les favoris");
      } else {
        this.hero.favorite = this.isFavorite;
        this.heroService.updateHero(this.hero);
        this.messageService.add("Héros enlevé des les favoris");
      }
    }
  }


}
