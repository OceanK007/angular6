import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

// Interceptors are used to modify the request/response before/after sending/fetching
// Here we have added Logged each request after sending request.
// Check "core.module.ts" where we used this Interceptor.
export class LoggingInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // This will intercept the after the request has been sent
        return next.handle(request).pipe(tap(
            event => {
                console.log('Logging interceptor ', event);
            }
        ));
    }
}