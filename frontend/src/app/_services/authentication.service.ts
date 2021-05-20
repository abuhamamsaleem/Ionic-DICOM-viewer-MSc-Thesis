import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private storage: Storage, private afAuth: AngularFireAuth) {}
  async login(email: string, password: string, rememberMe: any) {
    await this.afAuth.auth.setPersistence(rememberMe ? 'local' : 'session');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    await this.storage.remove('role');
    await this.storage.remove('user');
  }

  authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  currentUserObservable(): any {
    return this.afAuth.authState;
  }

  newPassword(newPassword: string): Promise<void> {
    return this.afAuth.auth.currentUser.updatePassword(newPassword);
  }

  newEmail(newEmail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newEmail);
  }

  updateCurrentUserName(name: string): Promise<void> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  passwordRemind(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  createUser(email: string, password: string, name?: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (name) {
          this.updateCurrentUserName(name);
        }
        return result.user;
      });
  }
}
