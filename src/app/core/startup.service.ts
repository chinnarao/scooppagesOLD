import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ClientAppStartupResponseModel } from "../models/sign.models";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class StartupService {
    public StartupModel: ClientAppStartupResponseModel;
    constructor(private httpClient: HttpClient) {} 
    getStartupModel(): Promise<any> {
        const promise = this.httpClient.get('https://localhost:44396/api/ClientAppStartup')
            .toPromise()
            .then(res => {
                this.StartupModel = res as ClientAppStartupResponseModel;
                return this.StartupModel;
            }, error => console.error(error));
        return promise;
    }
}