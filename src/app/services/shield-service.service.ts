import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  collectionData, docData, deleteField
} from '@angular/fire/firestore';
import { ShieldInterface } from "../data/shieldInterface";
import { FieldValue } from "firebase/firestore";
import {Observable} from "rxjs";
import {HelmetInterface} from "../data/helmetInterface";

@Injectable({
  providedIn: 'root',
})
export class ShieldService {
  static readonly url = 'shields'; // Chemin Firestore pour les boucliers

  constructor(private firestore: Firestore) {}

  /**
   * Crée un nouveau bouclier dans Firestore.
   * @param shield Les données du bouclier à créer.
   * @returns Une promesse void.
   */
  async createShield(shield: ShieldInterface): Promise<void> {
    const shieldCollection = collection(this.firestore, ShieldService.url);
    const shieldDoc = doc(shieldCollection);
    await setDoc(shieldDoc, { ...shield, id: shieldDoc.id });
  }

  /**
   * Récupère un hero par son id dans la base
   * @param id du hero
   */
  getShieldById(id: string | FieldValue | undefined): Observable<ShieldInterface> {
    const shieldDocument = doc(this.firestore, ShieldService.url + "/" + id);

    return docData(shieldDocument, { idField: 'id' }) as Observable<ShieldInterface>;
  }

  /**
   * Récupère la liste des héros en base
   */
  getShields() {
    const shieldDocument = collection(this.firestore, ShieldService.url);

    return collectionData(shieldDocument, { idField: 'id' }) as Observable<ShieldInterface[]>;
  }

  /**
   * Met à jour les caractéristiques d'un bouclier dans la BD
   * @param shieldId ID du bouclier
   * @param updates Objet contenant les mises à jour
   */
  updateShield(shieldId: string, updates: Partial<ShieldInterface>): Promise<void> {
    // Vérifier si le champ `assignedTo` doit être supprimé
    if (updates.assignedTo === null) {
      updates.assignedTo = deleteField(); // Utilisation de deleteField pour supprimer le champ
    }

    // Récupération du DocumentReference
    const shieldDocument = doc(this.firestore, `${ShieldService.url}/${shieldId}`);
    // Mise à jour partielle du document
    return updateDoc(shieldDocument, updates);
  }

  /**
   * Supprime un bouclier par son ID.
   * @param shieldId L'identifiant du bouclier.
   * @returns Une promesse void.
   */
  async deleteShield(shieldId: string): Promise<void> {
    const shieldDoc = doc(this.firestore, `${ShieldService.url}/${shieldId}`);
    await deleteDoc(shieldDoc);
  }
}
