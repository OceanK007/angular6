import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, switchMap } from 'rxjs/operators';
import * as AppReducersImport from '../ngrx/app.reducers';
import * as FirebaseAuthReducersImport from '../auth/ngrx/firebase-auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppReducersImport.AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Auth Interceptor ', request);
        // To set headers
        // const copiedRequest = request.clone({headers: request.headers.append('', '')});  
        // To set params
        return this.store.select('auth').pipe(switchMap(
            (authState: FirebaseAuthReducersImport.State) => {
                const copiedRequest = request.clone({params: request.params.set('auth', authState.token)});
                return next.handle(copiedRequest);
            }
        )) 

        // return null; // Will not let the request complete
    }
}