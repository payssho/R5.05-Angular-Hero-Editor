import { Routes } from '@angular/router';
import {HeroesComponent} from "./component/heroes/heroes.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {WeaponsComponent} from "./component/weapon/weapons.component";
import {HeroDetailComponent} from "./component/hero-detail/hero-detail.component";
import {HeroModifComponent} from "./component/hero-modif/hero-modif.component";
import {HeroCreateComponent} from "./component/hero-create/hero-create.component";
import {WeaponDetailComponent} from "./component/weapon-detail/weapon-detail.component";
import {WeaponModifComponent} from "./component/weapon-modif/weapon-modif.component";
import {WeaponCreateComponent} from "./component/weapon-create/weapon-create.component";
import {HelmetsComponent} from "./component/helmets/helmets.component";
import {ShieldsComponent} from "./component/shields/shields.component";
import {HelmetDetailComponent} from "./component/helmet-details/helmet-details.component";
import {ShieldDetailComponent} from "./component/shield-details/shield-details.component";
import {WelcomeComponent} from "./component/welcome/welcome.component";

//Toutes les routes menant à des pages
export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shield', component: ShieldsComponent },
  { path: 'shieldDetails/:id', component: ShieldDetailComponent },
  { path: 'helmet', component: HelmetsComponent },
  { path: 'helmetDetails/:id', component: HelmetDetailComponent },
  { path: 'heroeDetails/:id', component: HeroDetailComponent },
  { path: 'heroeModif/:id', component: HeroModifComponent },
  { path: 'heroCreate', component: HeroCreateComponent},
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weaponDetails/:id', component: WeaponDetailComponent },
  { path: 'weaponModif/:id', component: WeaponModifComponent },
  { path: 'weaponCreate', component: WeaponCreateComponent},
];
