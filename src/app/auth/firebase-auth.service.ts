import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseAuthService {
    accessToken: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                //console.log(response);
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => this.accessToken = token
                );
            }
        ).catch(
            error => console.log(error)
        );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.accessToken = token
        );

        return this.accessToken;
    }

    logout() {
        firebase.auth().signOut();
        this.accessToken = null;
    }

    isAuthenticated() {
        return this.accessToken != null;
    }
}