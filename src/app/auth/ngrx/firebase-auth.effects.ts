import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as FirebaseAuthActionsImport from './firebase-auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

// @Effects are used, when we don't want our action's dispatch to be dependent on some code
// before dispatching it. Like while dealing with async calls, and dispatching actions 
// after fetching response. 
// So @Effect is the solution of it
@Injectable()
export class FirebaseAuthEffects {
    // actions$ is like an Observable and will automatically fetch all the actions we using in this application
    constructor(private actions$: Actions, private router: Router) {}   
    
    // Here we have handled TRY_SIGNUP, before we were calling this.firebaseAuthService.signupUser(email,password);
    // in "signup.component.ts", now we dispatched TrySignup action, so this @Effect will be fired
    // Note: this.firebaseAuthService.signupUser(email,password); method won't be useful anymore here now.
    @Effect()   // @Effect({dispatch: false})
    authSignup = this.actions$
    .ofType(FirebaseAuthActionsImport.TRY_SIGNUP)       // So this effect will be fired when we dispatch TrySignup action
    .pipe(map(
        (action: FirebaseAuthActionsImport.TrySignup) => {
            return action.payload;
        }
    ))
    .pipe(switchMap(
        (authData: {username: string, password: string}) => {
            // Here .from() is converting a promise to an Observable, since @Effect needs observable at the end
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }
    ))
    .pipe(switchMap(
        () => {
            return from(firebase.auth().currentUser.getIdToken());
        }
    ))
    .pipe(mergeMap( // mergeMap to combine two the result of multiple observables and return new observable
        (token: string) => {
            // Finally we are returning actions which will be dispatched automatically and will change the state of app
            // So here we are dispatching a new effect which is a combination of SIGNUP and SET_TOKEN actions
            // and will be dispatched automatically to change state of app.

            // @Effect({dispatch: false})
            // Use this when you don't want to dispatch an effect i.e. which doesn't emit a new action i.e. doesn't change state
            // You must not return any action while using dispatch: false

            return [
                {
                    type: FirebaseAuthActionsImport.SIGNUP
                },
                {
                    type: FirebaseAuthActionsImport.SET_TOKEN,
                    payload: token
                }
            ];
        }
    ));

    // Here we have handled TRY_SIGNUP, before we were calling this.firebaseAuthService.signinUser(email,password);
    // in "signin.component.ts", now we dispatched TrySignin action, so this @Effect will be fired
    // Note: this.firebaseAuthService.signinUser(email,password);; method won't be useful anymore here now.
    @Effect()
    authSignin = this.actions$
    .ofType(FirebaseAuthActionsImport.TRY_SIGNIN)   // So this effect will be fired when we dispatch TrySignin action
    .pipe(map(
        (action: FirebaseAuthActionsImport.TrySignin) => {
            return action.payload;
        }
    ))
    .pipe(switchMap(
        (authData: {username: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }
    ))
    .pipe(switchMap(
        () => {
            return from(firebase.auth().currentUser.getIdToken());
        }
    ))
    .pipe(mergeMap( 
        (token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: FirebaseAuthActionsImport.SIGNIN
                },
                {
                    type: FirebaseAuthActionsImport.SET_TOKEN,
                    payload: token
                }
            ];
        }
    ));

    @Effect({dispatch: false})
    authLogout = this.actions$
    .ofType(FirebaseAuthActionsImport.LOGOUT)   // So this effect will be fired when we dispatch Logout action
    .pipe(tap(
        () => {
            this.router.navigate(['/']);
        }
    ));
}