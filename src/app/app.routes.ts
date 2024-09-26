import { Routes } from '@angular/router';
import {HeroesComponent} from "./component/heroes/heroes.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {WeaponComponent} from "./component/weapon/weapon.component";
import {ShieldComponent} from "./component/shield/shield.component";
import {HelmetComponent} from "./component/helmet/helmet.component";
import {HeroDetailComponent} from "./component/hero-detail/hero-detail.component";
import {HeroModifComponent} from "./component/hero-modif/hero-modif.component";

//Toutes les routes menant à des pages
export const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weapon', component: WeaponComponent },
  { path: 'shield', component: ShieldComponent },
  { path: 'helmet', component: HelmetComponent },
  { path: 'heroeDetails/:id', component: HeroDetailComponent },
  { path: 'heroeModif/:id', component: HeroModifComponent }
];
