import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from "./auth.service";
import { StartupService } from "./startup.service";

@Injectable()
export class GenericHttpClientService {
    constructor(private httpClient: HttpClient) { }

    get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(url);
    }

    post<T>(url: string, body: string): Observable<T> {
        return this.httpClient.post<T>(url, body);
    }

    put<T>(url: string, body: string): Observable<T> {
        return this.httpClient.put<T>(url, body);
    }

    delete<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(url);
    }

    patch<T>(url: string, body: string): Observable<T> {
        return this.httpClient.patch<T>(url, body);
    }
}