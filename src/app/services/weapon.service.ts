import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {WeaponInterface} from "../data/weaponInterface";

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
   * Modifie les caractéristique d'une arme dans la BD
   * @param weapon
   */
  updateWeapon(weapon: WeaponInterface): void {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + weapon.id);
    // Update du document à partir du JSON et du documentReference
    let newWeaponJSON = {id: weapon.id, name: weapon.name, range: weapon.range, damage: weapon.damage, speed: weapon.speed};
    updateDoc(weaponDocument, newWeaponJSON);
  }
}
