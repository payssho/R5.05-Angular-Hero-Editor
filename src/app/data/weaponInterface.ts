import { FieldValue } from "firebase/firestore"; // Assurez-vous que cette importation est en place
export interface WeaponInterface {
  id?: string;
  name: string;
  range: number;
  damage: number;
  speed: number;
  favorite: boolean;
  assignedTo?: string | null | FieldValue; // ID du héros auquel l'arme est assignée (optionnel)
}
