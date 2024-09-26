import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import { Location } from '@angular/common';

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
  heroId: number | undefined;
  hero?: HeroInterface;

  constructor(private heroService: HeroService, private location: Location) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.heroId = +params['id'];
    })
    this.heroService.getHeroById(this.heroId).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }
}
