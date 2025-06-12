import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top rounded">
      <div class="container-fluid">
        <a class="d-none d-md-block navbar-brand p-3" routerLink="/">
          <img src="assets/boothix.png" alt="Boothix logo" height="30"/>
        </a>
        <a class="d-md-none navbar-brand p-3" routerLink="/">
          <img src="assets/boothix-icon.png" alt="Boothix logo" height="30"/>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
          <div *ngIf="!isAuth" class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" (click)="authService.loginWithRedirect()" routerLinkActive="active" aria-current="page" >Se connecter</a>
              </li>
            </ul>
          </div>
          <div *ngIf="isAuth" class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" routerLinkActive="active" aria-current="page" routerLink="/client">Clients</a>
              </li>
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" routerLinkActive="active" routerLink="/device">Appareils</a>
              </li>
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" routerLinkActive="active" routerLink="/formula">Formules</a>
              </li>
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" routerLinkActive="active" routerLink="/option">Options</a>
              </li>
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" routerLinkActive="active" routerLink="/reservation">Réservations</a>
              </li>
              <li class="nav-item">
                <a class="p-3 fs-4 nav-link" (click)="authService.logout()" routerLinkActive="active" aria-current="page" >Se déconnecter</a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  `,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  styles: [`
    .navbar {
      background-color: #2E2E2C;
    }
    a {
      cursor: pointer;
    }
  `]
})
export class MenuComponent {

  authService = inject(AuthService);
  isAuth = false;

  constructor() {
    this.authService.isAuthenticated$.subscribe(isAuth => this.isAuth = isAuth);
  }


}
