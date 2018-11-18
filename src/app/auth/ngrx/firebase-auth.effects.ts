import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as FirebaseAuthActionsImport from './firebase-auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable()
export class FirebaseAuthEffects {
    // actions$ is like an Observable and will automatically fetch all the actions we using in this application
    constructor(private actions$: Actions) {}   

    // Use this when you have a side-effect which doesn't emit a new action i.e. doesn't change state
    // You must not return any action while using dispatch: false
    // @Effect({dispatch: false})

    @Effect()
    authSignup = this.actions$
    .ofType(FirebaseAuthActionsImport.TRY_SIGNUP)
    .pipe(map(
        (action: FirebaseAuthActionsImport.TrySignup) => {
            return action.payload;
        }
    ))
    .pipe(switchMap(
        (authData: {username: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }
    ))
    .pipe(switchMap(
        () => {
            return from(firebase.auth().currentUser.getIdToken());
        }
    ))
    .pipe(mergeMap(
        (token: string) => {
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
}