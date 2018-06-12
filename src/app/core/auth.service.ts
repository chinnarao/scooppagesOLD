import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';

import { GenericHttpClientService } from './generichttpclient.service';
import { StartupService } from "./startup.service";

import { TokenResponseModel, ClientAppStartupResponseModel,LoginRequestModel, UserRequestModel } from '../models/sign.models'
import { BEARER_TOKEN_NAME, EXPIRES_AT, EMAIL } from '../enums/const';

export const ANONYMOUS_USER: UserRequestModel = {
    id: "", userName : "", email: "", fullName : "", jobTitle : "", 
}

@Injectable()
export class AuthService {

    // Create a stream of logged in status to communicate throughout app : Future Plan
    //loggedIn: boolean;
    //loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
    
    private _loginStatus = new Subject<boolean>();
    //private headers: HttpHeaders;
    public Data: ClientAppStartupResponseModel;
    //public token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJjaGlubmFyYW9AbGl2ZS5jb20iLCJjaGlubmFyYW9AbGl2ZS5jb20iXSwianRpIjoiZDZhYzI4OWMtNTg0Ny00NmI2LTkyMzEtNTEwNzNmN2FiNzQyIiwiZW1haWwiOiJjaGlubmFyYW9AbGl2ZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9jb3VudHJ5IjoiaW5kaWEiLCJuYmYiOjE1MDgwNDk5OTYsImV4cCI6MTUwODMwOTE5NiwiaWF0IjoxNTA4MDQ5OTk2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMTkxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDE5MSJ9.CXyHm3nRFwEWRE4qhgQtbisr6f3-qEn-A-ZTKqzHdMk";

    constructor(private router: Router, private http: HttpClient, private startup: StartupService) {
    }

    //private ValidInputs() {
    //    if (!this.startup.StartupModel.SignUpUrl || !this.startup.StartupModel.LoginUrl) {
    //        throw new Error("My basic custom error");
    //    }
    //}

    // private setHeaders() {
    //     this.headers = new HttpHeaders();
    //     this.headers = this.headers.set('Content-Type', 'application/json');
    //     this.headers = this.headers.set('Accept', 'application/json');

    //     const token = '';//this._securityService.getToken();
    //     if (token !== '') {
    //         const tokenValue = 'Bearer ' + token;
    //         this.headers = this.headers.set('Authorization', tokenValue);
    //     }
    // }

    public Login(email: string, password: string): Observable<TokenResponseModel> {
        const body: LoginRequestModel = { Email: email, Password: password };
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        let url = this.startup.StartupModel.LoginUrl;
        return this.http.post<TokenResponseModel>(url, JSON.stringify(body), { headers: headers });
    }

    public SignUp = (email: string, password: string): Observable<TokenResponseModel> => {
        const body: LoginRequestModel = { Email: email, Password: password };
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        let url = this.startup.StartupModel.SignUpUrl;
        return this.http.post<TokenResponseModel>(url, JSON.stringify(body), { headers: headers });
    }

    getLoginStatusEvent(): Observable<boolean> {
        return this._loginStatus.asObservable();
    }

    public Logout() {
        localStorage.removeItem(BEARER_TOKEN_NAME); 
        localStorage.removeItem(EXPIRES_AT); 
        localStorage.removeItem(EMAIL); 
    }

    public setSession(response: TokenResponseModel) {
        //const expTime = response.ExpiresAt * 1000 + Date.now();
        localStorage.setItem(BEARER_TOKEN_NAME, response.BearerToken);
        localStorage.setItem(EXPIRES_AT, JSON.stringify(response.ExpiresAt));
        localStorage.setItem(EMAIL, JSON.stringify(response.Email));
    }

    get authenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT));
        let isAuthenticated = Date.now() < expiresAt;
        if (!isAuthenticated)
            this.Logout();
        return isAuthenticated;
    }

    public writeToStorage<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public retrieveFromStorage<T>(key: string): T {
        const stored = localStorage.getItem(key);
        if (!stored) {
            return null;
        }
        return JSON.parse(stored);
    }

    //private subject = new BehaviorSubject<

    
    
    getStartupModel(): Promise<any> {
        const promise = this.http.get('https://localhost:44396/api/ClientAppStartup')
            .toPromise()
            .then(res => {
                this.Data = res as ClientAppStartupResponseModel;
                return this.Data;
            }, error => console.error(error));
        return promise;
    }
}

