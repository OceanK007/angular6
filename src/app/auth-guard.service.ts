import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, 
                routerStateSnapshot: RouterStateSnapshot): 
                Observable<boolean> | Promise<boolean> | boolean 
    {
        return this.authService.isAuthenticated()
        .then(
            (authenticated: boolean) => {
                if(authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    // You can return false, so nothing will happen on click
                }
            }
        );
    }

    // To apply authentication only to child routes, use this
    canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot, 
        routerStateSnapshot: RouterStateSnapshot): 
        Observable<boolean> | Promise<boolean> | boolean 
    {
        return this.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    }
}