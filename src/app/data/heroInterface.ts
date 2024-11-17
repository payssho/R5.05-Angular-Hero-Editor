import {FieldValue} from "firebase/firestore";

export interface HeroInterface {
  id?: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  favorite: boolean;
  weaponId?: string | FieldValue; // ID de l'arme assignée (optionnel)
}
