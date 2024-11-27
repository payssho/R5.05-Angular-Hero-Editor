import { FieldValue } from "firebase/firestore";
export interface ShieldInterface {
  id?: string;
  name?: string;
  defense?: number;
  damage?: number;
  assignedTo?: string | null | FieldValue;
}
