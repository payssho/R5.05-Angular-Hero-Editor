import { Routes } from '@angular/router';
import {HeroesComponent} from "./component/heroes/heroes.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {WeaponsComponent} from "./component/weapon/weapons.component";
import {ShieldComponent} from "./component/shield/shield.component";
import {HelmetComponent} from "./component/helmet/helmet.component";
import {HeroDetailComponent} from "./component/hero-detail/hero-detail.component";
import {HeroModifComponent} from "./component/hero-modif/hero-modif.component";
import {HeroCreateComponent} from "./component/hero-create/hero-create.component";
import {WeaponDetailComponent} from "./component/weapon-detail/weapon-detail.component";
import {WeaponModifComponent} from "./component/weapon-modif/weapon-modif.component";
import {WeaponCreateComponent} from "./component/weapon-create/weapon-create.component";

//Toutes les routes menant à des pages
export const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shield', component: ShieldComponent },
  { path: 'helmet', component: HelmetComponent },
  { path: 'heroeDetails/:id', component: HeroDetailComponent },
  { path: 'heroeModif/:id', component: HeroModifComponent },
  { path: 'heroCreate', component: HeroCreateComponent},
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weaponDetails/:id', component: WeaponDetailComponent },
  { path: 'weaponModif/:id', component: WeaponModifComponent },
  { path: 'weaponCreate', component: WeaponCreateComponent},
];
