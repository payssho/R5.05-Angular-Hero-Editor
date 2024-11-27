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
  collectionData, docData
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
  getHelmetById(id: string | FieldValue): Observable<HelmetInterface> {
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
   * Met à jour un casque existant.
   * @param helmetId L'identifiant du casque.
   * @param updates Les champs à mettre à jour.
   * @returns Une promesse void.
   */
  async updateHelmet(helmetId: string, updates: Partial<HelmetInterface>): Promise<void> {
    const helmetDoc = doc(this.firestore, `${HelmetService.url}/${helmetId}`);
    await updateDoc(helmetDoc, updates);
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
