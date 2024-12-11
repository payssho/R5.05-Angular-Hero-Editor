# **Nom de l'application**

## **1. Démarrer l'application**

Pour lancer l'application rendez-vous ici : https://r5-05-angular-hero-editor.vercel.app/

---

## **2. Description des fonctionnalités de l'éditeur**

### **Page d'accueil**
- Affiche une présentation générale de l'application.
- Un menu à gauche est présent pour naviguer dans l'app
- Un menu à droite était censé afficher le héros sélectionné mais la fonctionnalité n'est pas implentée

### **Dashboard**
- Liste tous les héros favoris, cliquer sur un héros affichera ses détails.
- Liste toutes les armes favorites, cliquer sur une arme affichera ses détails.

### **Page des héros**
- Liste tous les héros disponibles.
- Fonctionnalités :
  - **Filtrer les héros** : champ de recherche par nom qui filtre pour trouver un héros spécifique.
  - **Trier les héros** : possibilité de trie de la liste des héros par soit vie, attaque ou défense
  - **Ajouter un héros** : bouton pour créer un nouveau héros.
  - **Détail d'un héro** : cliquer sur un héro pour arriver sur le component de ses caractéristiques

### **Création d'un héro**
- Créer un héro (pas de réactive form (il sera présent lors de la création d'une arme))
- Fonctionnalités :
  - **Le nom** : Le nom doit comporter min 1 caractère.
  - **Compétences** : 40 pts à attribuer entre les 3 compétences (pas moins de 1 pour une compétence)
  - **Retour** : double vérification.

### **Page d'un héro**
- Affiche le détail d'un héro.
- Fonctionnalités :
  - **Favoris** : Cliquer sur la petite étoile met le héro en favoris (disponible dans le dashboard)
  - **CRUD héro** : Suppression, modification (Marche comme la création de héro au niveau vérifications) et tous les détails du héro dispo (ses caractéristiques dépendent de son équipement et points de compétences).
  - **Ajouter/enlever une arme** : assigne une arme au héro, les détails du héro sont mis à jour, une arme est assignable qu'a un seul héro. Une arme ne peut pas être assignée si après assignation son attque est < 0
  - **Ajouter/enlever un casque** : assigne un casque au héro, les détails du héro sont mis à jour, un casque est assignable à plusieurs héros.
  - **Ajouter/enlever un bouclier** : assigne un bouclier au héro, les détails du héro sont mis à jour, un bouclier est assignable à plusieurs héros.

### **Page des armes**
- Liste toutes les armes disponibles.
- Fonctionnalités :
  - **Filtrer les armes** : champ de recherche par nom qui filtre pour trouver une arme spécifique.
  - **Trier les armes** : possibilité de trie de la liste des armes par soit attaque, portée ou vitesse
  - **Ajouter une arme** : bouton pour créer une nouvelle arme.
  - **Détail d'une arme** : cliquer sur une arme pour arriver sur le component de ses caractéristiques

### **Création d'une arme**
- Créer une arme REACTIVE FORM IMPLÉMENTÉ ICI !
- Fonctionnalités :
  - **Le nom** : Le nom doit comporter min 1 caractère.
  - **Compétences** : Chaque compétences doit être entre -5 et 5. La somme des 3 doit être = 0;
  - **Retour** : double vérification.

### **Page d'une arme**
- Affiche le détail d'une arme (dont le héro auquel elle est assignée si elle en a un.
- Fonctionnalités :
  - **Favoris** : Cliquer sur la petite étoile met l'arme en favoris (disponible dans le dashboard)
  - **CRUD arme** : Suppression, modification (Marche comme la création de l'arme au niveau vérifications) et tous les détails de l'arme dispo (ses caractéristiques dépendent de ses points de compétences).

### **Page des casques et des boucliers**
- Liste des équipements (boucliers, casques) et leurs caractéristiques (liste déja présente en base non modifiable.)
- Fonctionnalités :
  - **Liste des casques** : liste des casques, lors du clique sur un casque on peut obtenir ses caractéristiques.
  - **Modifier un équipement** : liste des boucliers, lors du clique sur un bouclier on peut obtenir ses caractéristiques.
