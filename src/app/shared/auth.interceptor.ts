import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, switchMap, take } from 'rxjs/operators';
import * as AppReducersImport from '../ngrx/app.reducers';
import * as FirebaseAuthReducersImport from '../auth/ngrx/firebase-auth.reducers';

// Interceptors are used to modify the request/response before/after sending/fetching
// Here we have added "auth" parameter to each request before sending it
// Check "core.module.ts" where we used this Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppReducersImport.AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Auth Interceptor ', request);
        // To set headers
        // const copiedRequest = request.clone({headers: request.headers.append('', '')});  
        // To set params
        return this.store.select('auth')
        .pipe(take(1))  // To take auth value only once
        .pipe(switchMap(
            (authState: FirebaseAuthReducersImport.State) => {
                const copiedRequest = request.clone({params: request.params.set('auth', authState.token)});
                return next.handle(copiedRequest);
            }
        )) 

        // return null; // Will not let the request complete
    }
}