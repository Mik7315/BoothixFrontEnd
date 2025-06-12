
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideAuth0 } from "@auth0/auth0-angular";
import { provideServiceWorker } from "@angular/service-worker";
import { importProvidersFrom, isDevMode } from "@angular/core";
import { PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from "@angular/router";
import { routes } from './app/app-routing.module';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatNativeDateModule } from "@angular/material/core";
import { AuthGuard } from "./app/guards/auth-guard";

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-gqsvyp352yztcuds.eu.auth0.com',
      clientId: 'e1Kd1fLJVCvhiDbzQhnrDzRSkWM6czQw',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
    ),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(MatNativeDateModule),
    AuthGuard
  ]
}).catch(err => console.log(err));
