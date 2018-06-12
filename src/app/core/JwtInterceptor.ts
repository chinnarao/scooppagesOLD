import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { StartupService } from "./startup.service";
import { BEARER_TOKEN_NAME } from "../enums/const";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private startup: StartupService, private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        const bearerToken = this.auth.retrieveFromStorage(BEARER_TOKEN_NAME);
        if (!req.headers.has('Content-Type'))
            req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
        if (!req.headers.has('Accept'))
            req = req.clone({ setHeaders: { 'Accept': 'application/json' } });
        if (bearerToken) {
            req = req.clone({ setHeaders: { Authorization: 'Bearer ' + bearerToken } }); //'Authorization'
            console.log(JSON.stringify(req));
            return next.handle(req).do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            });
        } else {
            console.log(JSON.stringify(req));
            return next.handle(req);
        }
    }
}