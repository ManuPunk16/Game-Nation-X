import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceTsService {

  userData: any;
  isLoggedIn = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.isLoggedIn = !this.isSessionExpired();

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        // console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const userCredential = await this.afAuth.signInWithPopup(provider);

    // Verificar si el usuario autenticado tiene el correo electrónico permitido
    if (userCredential) {
      if (userCredential.user?.email === 'luisadrianhdzsoto@gmail.com') {
        this.router.navigate(['/dashboard']);
      }
      // console.log(userCredential.user);
      this.isLoggedIn = true;
      // Guardar sesión en cache con vencimiento en tres horas
      const expirationDate = new Date().getTime() + (3 * 60 * 60 * 1000);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      localStorage.setItem('expiration', expirationDate.toString());
    } else {
      // Si el correo electrónico no coincide, cerrar sesión y marcar como no autenticado
      await this.afAuth.signOut();
      this.isLoggedIn = false;
      alert('Acceso denegado. Por favor inicie sesión con una cuenta autorizada.');
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     role: user.role
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  async logout() {
    await this.afAuth.signOut();
    this.isLoggedIn = false;
    // Eliminar sesión de cache
    localStorage.removeItem('user');
    localStorage.removeItem('expiration');
    window.location.reload();
  }

  isSessionExpired(): boolean {
    if (typeof window === 'undefined') {
      return false; // No estamos en el contexto del navegador, no hay sesión expirada
    }

    const expiration = localStorage.getItem('expiration');
    if (!expiration) {
      return true;
    }
    const expirationDate = new Date(+expiration);
    const isExpired = expirationDate <= new Date();
    if (isExpired) {
      this.logout();
    }
    return isExpired;
  }
}
