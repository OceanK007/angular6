import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { map, take } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as AppReducersImport from '../ngrx/app.reducers';
import * as FirebaseAuthReducersImport from './ngrx/firebase-auth.reducers';

// Guard is used to restrict user from accessing links if not authorized
// Here we have restricted user from accessing "New Recipe" and "Edit Recipe"
// if user has not logged in. 
// check "recipes-routing.module.ts" where we applied this guard
@Injectable()
export class FirebaseAuthGuardService implements CanActivate {

    constructor(private store: Store<AppReducersImport.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
        // If you don't use take(1) then if you paste this url: http://localhost:4200/recipes/new
        // This AuthGuard will take only one request or one element per guard activation
        .pipe(
            take(1),
            map(
                (authState: FirebaseAuthReducersImport.State) => {
                    return authState.authenticated;
                }
            )
        );
    }
}