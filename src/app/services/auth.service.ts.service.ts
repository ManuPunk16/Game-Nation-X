import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceTsService {

  isLoggedIn = false;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.isLoggedIn = !this.isSessionExpired();
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const userCredential = await this.afAuth.signInWithPopup(provider);

    // Verificar si el usuario autenticado tiene el correo electrónico permitido
    if (userCredential.user?.email === 'luisadrianhdzsoto@gmail.com') {
      console.log(userCredential.user);
      this.isLoggedIn = true;
      // Guardar sesión en cache con vencimiento en una hora
      const expirationDate = new Date().getTime() + (60 * 60 * 1000);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      localStorage.setItem('expiration', expirationDate.toString());
    } else {
      // Si el correo electrónico no coincide, cerrar sesión y marcar como no autenticado
      await this.afAuth.signOut();
      this.isLoggedIn = false;
      alert('Acceso denegado. Por favor inicie sesión con una cuenta autorizada.');
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.isLoggedIn = false;
    // Eliminar sesión de cache
    localStorage.removeItem('user');
    localStorage.removeItem('expiration');
  }

  isSessionExpired(): boolean {
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
