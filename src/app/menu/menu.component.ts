import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgIf } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
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
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ng-container *ngIf="!isAuth">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" (click)="authService.loginWithRedirect()" routerLinkActive="active" aria-current="page">Se connecter</a>
                </li>
              </ul>
            </ng-container>
            <ng-container *ngIf="isAuth">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" routerLinkActive="active" aria-current="page" routerLink="/client" (click)="collapseNavbar()">Clients</a>
                </li>
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" routerLinkActive="active" routerLink="/device" (click)="collapseNavbar()">Appareils</a>
                </li>
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" routerLinkActive="active" routerLink="/formula" (click)="collapseNavbar()">Formules</a>
                </li>
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" routerLinkActive="active" routerLink="/option" (click)="collapseNavbar()">Options</a>
                </li>
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" routerLinkActive="active" routerLink="/reservation" (click)="collapseNavbar()">Réservations</a>
                </li>
                <li class="nav-item">
                  <a class="p-2 fs-6 nav-link" (click)="authService.logout()" routerLinkActive="active" aria-current="page">Se déconnecter</a>
                </li>
              </ul>
            </ng-container>
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
      padding: 0 !important;
      z-index: 3000 !important;
    }
    .navbar-collapse {
      z-index: 3000 !important;
    }
    a {
      cursor: pointer;
    }
  `]
})
export class MenuComponent {
  //Pour fermer la navbar au click, pas automatique
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  authService = inject(AuthService);
  isAuth = false;

  constructor() {
    this.authService.isAuthenticated$.subscribe(isAuth => this.isAuth = isAuth);
  }

  collapseNavbar() {
    const navbar = this.navbarCollapse.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
