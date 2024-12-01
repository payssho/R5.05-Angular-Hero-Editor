import {FieldValue} from "firebase/firestore";

export interface HeroInterface {
  id?: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  favorite: boolean;
  weaponId?: string | FieldValue;
  helmetId?: string | FieldValue;
  shieldId?: string | FieldValue;
  currentHero?: boolean;
}
