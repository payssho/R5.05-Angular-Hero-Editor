import {Component, inject} from '@angular/core';
import {Location, UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-hero-modif',
  standalone: true,
  imports: [
    UpperCasePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hero-modif.component.html',
  styleUrl: './hero-modif.component.css'
})
export class HeroModifComponent {

  //Pour obtenir les infos de la route
  private route = inject(ActivatedRoute);

  //Infos de base
  hero?: HeroInterface;
  heroId?: number;

  //Import des services et utils
  constructor(private heroService: HeroService, private messageService: MessageService,  private location: Location) {
  }

  //Init
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.heroId = +params['id'];
    })
    this.heroService.getHeroById(this.heroId).subscribe(hero => this.hero = hero);
  }

  //reviens a la page précédente
  goBack(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }

  //Vérifie si les compétences dépassent 40
  verifySkills(): boolean {
    if (this.hero) {
      const totalSkills = this.hero.attack + this.hero.health + this.hero.defense;
      console.log(totalSkills,this.hero.attack, this.hero.health, this.hero.defense )
      if(totalSkills <= 40) {
        return true;
      } else {
        this.messageService.add("Les points de compétence sont limités à 40");
      }
    }
    return false; // Si this.hero est undefined, on retourne false
  }


}
