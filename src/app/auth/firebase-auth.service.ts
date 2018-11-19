// import * as firebase from 'firebase';
// import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as AppReducersImport from '../ngrx/app.reducers';
// import * as FirebaseAuthActionsImport from './ngrx/firebase-auth.actions';

// @Injectable()
// export class FirebaseAuthService {
//     accessToken: string;

//     constructor(private router: Router, private store: Store<AppReducersImport.AppState>) {}

//     signupUser(email: string, password: string) {
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(
//             user => {
//                 this.store.dispatch(new FirebaseAuthActionsImport.Signup());
//                 firebase.auth().currentUser.getIdToken().then(
//                     (token: string) => {
//                         //this.accessToken = token
//                         this.store.dispatch(new FirebaseAuthActionsImport.SetToken(token));
//                     }
//                 );
//             }
//         ).catch(
//             error => console.log(error)
//         );
//     }

//     signinUser(email: string, password: string) {
//         firebase.auth().signInWithEmailAndPassword(email, password).then(
//             response => {
//                 this.store.dispatch(new FirebaseAuthActionsImport.Signin());
//                 //console.log(response);
//                 this.router.navigate(['/']);
//                 firebase.auth().currentUser.getIdToken().then(
//                     (token: string) => {
//                         //this.accessToken = token
//                         this.store.dispatch(new FirebaseAuthActionsImport.SetToken(token));
//                     }
//                 );
//             }
//         ).catch(
//             error => console.log(error)
//         );
//     }

//     getToken() {
//         firebase.auth().currentUser.getIdToken().then(
//             (token: string) => this.accessToken = token
//         );

//         return this.accessToken;
//     }

//     logout() {
//         firebase.auth().signOut();
//         //this.accessToken = null;
//         this.store.dispatch(new FirebaseAuthActionsImport.Logout());
//     }
// }