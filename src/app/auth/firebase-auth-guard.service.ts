import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable()
export class FirebaseAuthGuardService implements CanActivate {

    constructor(private firebaseAuthService: FirebaseAuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.firebaseAuthService.isAuthenticated();
    }
}