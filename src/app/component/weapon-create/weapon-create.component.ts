import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Location, UpperCasePipe } from "@angular/common";
import { WeaponInterface } from "../../data/weaponInterface";
import { WeaponService } from "../../services/weapon.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-weapon-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './weapon-create.component.html',
  styleUrl: './weapon-create.component.css'
})
export class WeaponCreateComponent {

  weaponForm?: FormGroup;  // Define the FormGroup
  weapon?: WeaponInterface = {
    id: 0,
    favorite: false,
    name: "",
    damage: 1,
    range: 1,
    speed: 1
  };
  totalStats: number = 0;
  damage: number = 0;
  range: number = 0;
  speed: number = 0;

  constructor(private weaponService: WeaponService, private messageService: MessageService, private location: Location) {}

  ngOnInit(): void {
    // Initialize the form with default values and validators
    this.weaponForm = new FormGroup({
      name: new FormControl(this.weapon?.name, [Validators.required]),  // Name is required
    }, { validators: this.totalStatsValidator() });  // Add custom validator here
  }

  // Custom validator to check totalStats
  totalStatsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.totalStats !== 0) {
        return { 'invalidTotalStats': { value: this.totalStats } };  // Validation fails when totalStats !== 0
      }
      return null;  // Validation passes
    };
  }


  /**
   * Augmente les caractéristiques de l'arme de 1
   * @param type de caractéristique
   */
  increase(type: string): void {
    if (this.damage == null || this.range == null || this.speed == null) {
      return;
    }

    switch (type) {
      case 'damage':
        if (this.damage < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.damage++;
          this.totalStats!++;
        } else {
          this.messageService.add("Les dégâts ne peuvent pas dépasser 5");
        }
        break;

      case 'range':
        if (this.range < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.range++;
          this.totalStats!++;
        } else {
          this.messageService.add("La portée ne peut pas dépasser 5");
        }
        break;

      case 'speed':
        if (this.speed < 5) {  // Limite à 5 et vérifie qu'il reste des points
          this.speed++;
          this.totalStats!++;
        } else {
          this.messageService.add("La vitesse ne peut pas dépasser 5");
        }
        break;

      default:
        break;
    }
    this.weaponForm?.updateValueAndValidity();
  }

  /**
   * Diminue les caractéristiques de l'arme de 1
   * @param type de caractéristique
   */
  decrease(type: string): void {
    if (this.damage == null || this.range == null || this.speed == null) {
      return;
    }

    switch (type) {
      case 'damage':
        if (this.damage > -5) {  // Limite à -5
          this.damage--;
          this.totalStats!--;
        } else {
          this.messageService.add("Les dégâts ne peuvent pas être inférieurs à -5");
        }
        break;

      case 'range':
        if (this.range > -5) {  // Limite à -5
          this.range--;
          this.totalStats!--;
        } else {
          this.messageService.add("La portée ne peut pas être inférieure à -5");
        }
        break;

      case 'speed':
        if (this.speed > -5) {  // Limite à -5
          this.speed--;
          this.totalStats!--;
        } else {
          this.messageService.add("La vitesse ne peut pas être inférieure à -5");
        }
        break;

      default:
        break;
    }
    this.weaponForm?.updateValueAndValidity();
  }

  get name() {
    return this.weaponForm?.get('name');
  }

  /**
   * Enregistre en base les modifications de l'arme
   */
  saveWeapon(): void {
    if (this.weaponForm?.valid) {
      const formValues = this.weaponForm.value;

      if (this.weapon) {
        this.weapon.name = formValues.name;
        this.weapon.damage = formValues.damage;
        this.weapon.range = formValues.range;
        this.weapon.speed = formValues.speed;
        this.weaponService.updateWeapon(this.weapon);
      }

      this.messageService.add("Modification enregistrée !");
      this.location.back();
    } else {
      this.messageService.add("Le nom de l'arme est obligatoire !");
    }
  }


  back(): void {
    this.location.back();
  }
}
