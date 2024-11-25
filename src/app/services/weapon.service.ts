import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc, deleteField,
  doc,
  docData,
  Firestore,
  updateDoc, where
} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {WeaponInterface} from "../data/weaponInterface";
import {query} from "@angular/animations";
import {FieldValue} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

// URL d'accès aux documents sur Firebase
  private static url = 'weapons';
  constructor(private firestore: Firestore) {
  }

  /**
   * Récupère la liste des armes en base
   */
  getWeapons() {
    const weaponDocument = collection(this.firestore, WeaponService.url);

    return collectionData(weaponDocument, { idField: 'id' }) as Observable<WeaponInterface[]>;
  }

  /**
   * Récupère une arme par son id dans la base
   * @param id de l'arme
   */
  getWeaponById(id: string | FieldValue): Observable<WeaponInterface> {
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);

    console.log("PASSÉ WEAPON")
    return docData(weaponDocument, { idField: 'id' }) as Observable<WeaponInterface>;
  }


  /**
   * Récupère la liste des armes disponibles en base
   */
  getAvailableWeapons(): Observable<WeaponInterface[]> {
    return this.getWeapons().pipe(
      map(weapons => weapons.filter(weapon => !weapon.assignedTo))
    );
  }

  /**
   * Récupère une arme par son id dans la base
   * @param id de l'arme
   */
  getWeapon(id: string): Observable<WeaponInterface> {
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);

    return docData(weaponDocument, { idField: 'id' }) as Observable<WeaponInterface>;
  }

  /**
   * Supprime une arme de la bd a partir de son ID
   * @param id de l'arme
   */
  deleteWeapon(id: string): Promise<void> {
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);

    return deleteDoc(weaponDocument);
  }

  /**
   * Ajoute une arme dans la bd
   * @param arme
   */
  addWeapon(weapon: WeaponInterface): void {
    // get a reference to the weapon collection
    const weaponCollection = collection(this.firestore, WeaponService.url);
    addDoc(weaponCollection, weapon);
  }

  /**
   * Met à jour les caractéristiques d'une arme dans la BD
   * @param weaponId ID de l'arme
   * @param updates Objet contenant les mises à jour
   */
  updateWeapon(weaponId: string, updates: Partial<WeaponInterface>): Promise<void> {
    // Vérifier si le champ `assignedTo` doit être supprimé
    if (updates.assignedTo === null) {
      updates.assignedTo = deleteField(); // Utilisation de deleteField pour supprimer le champ
    }

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, `${WeaponService.url}/${weaponId}`);
    // Mise à jour partielle du document
    return updateDoc(weaponDocument, updates);
  }


}
