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
import { HelmetInterface} from "../data/helmetInterface";
import { FieldValue } from "firebase/firestore";
import {Observable} from "rxjs";
import {HeroInterface} from "../data/heroInterface";

@Injectable({
  providedIn: 'root',
})
export class HelmetService {
  static readonly url = 'helmets'; // Chemin Firestore pour les casques

  constructor(private firestore: Firestore) {}

  /**
   * Crée un nouveau casque dans Firestore.
   * @param helmet Les données du casque à créer.
   * @returns Une promesse void.
   */
  async createHelmet(helmet: HelmetInterface): Promise<void> {
    const helmetCollection = collection(this.firestore, HelmetService.url);
    const helmetDoc = doc(helmetCollection);
    await setDoc(helmetDoc, { ...helmet, id: helmetDoc.id });
  }

  /**
   * Récupère un hero par son id dans la base
   * @param id du hero
   */
  getHelmetById(id: string | FieldValue | undefined): Observable<HelmetInterface> {
    const helmetDocument = doc(this.firestore, HelmetService.url + "/" + id);

    return docData(helmetDocument, { idField: 'id' }) as Observable<HelmetInterface>;
  }

  /**
   * Récupère la liste des héros en base
   */
  getHelmets() {
    const helmetDocument = collection(this.firestore, HelmetService.url);

    return collectionData(helmetDocument, { idField: 'id' }) as Observable<HelmetInterface[]>;
  }

  /**
   * Met à jour les caractéristiques d'un casque dans la BD
   * @param helmetId ID du casque
   * @param updates Objet contenant les mises à jour
   */
  updateHelmet(helmetId: string, updates: Partial<HelmetInterface>): Promise<void> {
    // Vérifier si le champ `assignedTo` doit être supprimé
    if (updates.assignedTo === null) {
      updates.assignedTo = deleteField(); // Utilisation de deleteField pour supprimer le champ
    }

    // Récupération du DocumentReference
    const helmetDocument = doc(this.firestore, `${HelmetService.url}/${helmetId}`);
    // Mise à jour partielle du document
    return updateDoc(helmetDocument, updates);
  }

  /**
   * Supprime un casque par son ID.
   * @param helmetId L'identifiant du casque.
   * @returns Une promesse void.
   */
  async deleteHelmet(helmetId: string): Promise<void> {
    const helmetDoc = doc(this.firestore, `${HelmetService.url}/${helmetId}`);
    await deleteDoc(helmetDoc);
  }
}
