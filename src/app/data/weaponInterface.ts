import { FieldValue } from "firebase/firestore";
export interface WeaponInterface {
  id?: string;
  name: string;
  range: number;
  damage: number;
  speed: number;
  favorite: boolean;
  assignedTo?: string | null | FieldValue;
}
