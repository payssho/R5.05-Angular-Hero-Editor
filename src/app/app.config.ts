import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"angular-r5-05","appId":"1:143096403659:web:297ff056d0307d11636d4e","storageBucket":"angular-r5-05.appspot.com","apiKey":"AIzaSyDfFYPVbHDVrfKJE1Ou79aQ1PCq6QscZuw","authDomain":"angular-r5-05.firebaseapp.com","messagingSenderId":"143096403659"})), provideFirestore(() => getFirestore())]
};
