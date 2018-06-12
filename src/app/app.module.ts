import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';

import { AppComponent } from './app.component';
import { SignComponent } from './components/sign/sign.component';

import { StartupService } from "./core/startup.service";
import { HomeComponent } from './components/home/home.component';
import { RouteModule } from './modules/route.module';
import { GenericHttpClientService } from './core/generichttpclient.service';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from './core/auth.service';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.getStartupModel();
}

@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, HttpClientModule, RouteModule
  ],
  declarations: [AppComponent, SignComponent, HomeComponent, MenuComponent],
  bootstrap: [AppComponent ],
  entryComponents: [SignComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true },
    StartupService, GenericHttpClientService, AuthService
  ],
})
export class AppModule { }
