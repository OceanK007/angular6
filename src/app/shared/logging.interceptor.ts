import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

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