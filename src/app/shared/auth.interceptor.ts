import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FirebaseAuthService } from "../auth/firebase-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private firebaseAuthService: FirebaseAuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Auth Interceptor ', request);
        // To set headers
        // const copiedRequest = request.clone({headers: request.headers.append('', '')});  
        // To set params
        const copiedRequest = request.clone({params: request.params.set('auth', this.firebaseAuthService.getToken())});

        // return null; // Will not let the request complete
        return next.handle(copiedRequest);
    }
}