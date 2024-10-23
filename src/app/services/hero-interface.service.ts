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
import {HeroInterface} from "../data/heroInterface";

@Injectable({
  providedIn: 'root'
})
export class HerointerfaceService {

// URL d'accès aux documents sur Firebase
  private static url = 'heroes';
  constructor(private firestore: Firestore) {
  }

  /**
   * Récupère la liste des héros en base
   */
  getHeroes() {
    const heroesDocument = collection(this.firestore, HerointerfaceService.url);

    return collectionData(heroesDocument, { idField: 'id' }) as Observable<HeroInterface[]>;
  }

  /**
   * Récupère un hero par son id dans la base
   * @param id du hero
   */
  getHero(id: string): Observable<HeroInterface> {
    const heroDocument = doc(this.firestore, HerointerfaceService.url + "/" + id);

    return docData(heroDocument, { idField: 'id' }) as Observable<HeroInterface>;
  }

  /**
   * Supprime un hero de la bd a partir de son ID
   * @param id du hero
   */
  deleteHero(id: string): Promise<void> {
    const heroDocument = doc(this.firestore, HerointerfaceService.url + "/" + id);

    return deleteDoc(heroDocument);
  }

  /**
   * Ajoute un hero dans la bd
   * @param hero
   */
  addHero(hero: HeroInterface): void {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, HerointerfaceService.url);

    addDoc(heroCollection, hero);
  }

  /**
   * Modifie les caractéristique d'un hero dans la BD
   * @param hero
   */
  updateHero(hero: HeroInterface): void {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HerointerfaceService.url + "/" + hero.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {id: hero.id, name: hero.name, health: hero.health, attack: hero.attack, defense: hero.defense, favorite: hero.favorite};
    updateDoc(heroDocument, newHeroJSON);
  }
}
