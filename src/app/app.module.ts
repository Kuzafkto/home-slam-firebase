import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider } from './core/services/http-client.provider';
import { HttpClientWebProvider } from './core/services/http-client-web.provider';
import { AuthService } from './core/services/auth.service';
import { ApiService } from './core/services/api.service';
import { AuthStrapiService } from './core/services/auth-strapi.service';
import { JwtService } from './core/services/jwt.service';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './core/services/custom-translate.service';
import { SharedModule } from "./shared/shared.module";

export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceProvider(
  jwt:JwtService,
  api:ApiService
) {
  return new AuthStrapiService(jwt, api);
}

@NgModule({
    declarations: [AppComponent],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HttpClientProvider,
            deps: [HttpClient, Platform],
            useFactory: httpProviderFactory,
        },
        {
            provide: AuthService,
            deps: [JwtService, ApiService],
            useFactory: AuthServiceProvider,
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        SharedModule
    ]
})
export class AppModule {}
