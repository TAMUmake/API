// Import Angular Dependencies
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Import RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  Http,
} from '@angular/http';
import {
  Account,
} from '../models';

@Injectable()
export class AccountService {

  private currentUser: firebase.User = undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private http: Http,
  ) {
    this.fetchCurrentUserInfo();
  }

  public registerUser(user: Account) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public loginUser(user: Account) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout() {
    return this.afAuth.auth.signOut();
  }

  public isLoggedIn() {
    return this.currentUser === null;
  }

  public loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public subscribeAuthState() {
    return this.afAuth.authState;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getAppliedStatus() {
    let url = 'https://us-central1-tamum-c5fdd.cloudfunctions.net/hasApplied?uid=' + this.currentUser.uid;
    return this.http.get(url);
  }

  public getSponsorStatus(uid: string) {
    let url = 'https://us-central1-tamum-c5fdd.cloudfunctions.net/isSponsor?uid=' + uid;
    return this.http.get(url);
  }

  private fetchCurrentUserInfo() {
    this.afAuth.authState.subscribe( (result) => {
      this.currentUser = result;
    });
  }

}
