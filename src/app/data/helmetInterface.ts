import { FieldValue } from "firebase/firestore";
export interface HelmetInterface {
  id?: string;
  name?: string;
  health?: number;
  defense?: number;
  assignedTo?: string | null | FieldValue;
}
