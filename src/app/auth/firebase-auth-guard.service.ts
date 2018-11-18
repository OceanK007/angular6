import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { FirebaseAuthService } from "./firebase-auth.service";
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as AppReducersImport from '../ngrx/app.reducers';
import * as FirebaseAuthReducersImport from './ngrx/firebase-auth.reducers';

@Injectable()
export class FirebaseAuthGuardService implements CanActivate {

    constructor(private store: Store<AppReducersImport.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(map(
            (authState: FirebaseAuthReducersImport.State) => {
                return authState.authenticated;
            }
        ));
    }
}