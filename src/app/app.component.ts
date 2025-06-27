import { Component, inject } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { RouterOutlet } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <div class="app-container" *ngIf="authService.isAuthenticated$ | async as isAuth">
      <div class="header">
        <app-menu class="w-100"></app-menu>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 70px;
      width: 100%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      margin-top: 70px;
      height: 100%;
      overflow: auto;
      padding: 1rem;
    }
  `]
})
export class AppComponent {
  authService = inject(AuthService);

  constructor() {
    this.authService.isAuthenticated$.subscribe(x => {
      if(!x) {
        this.authService.loginWithRedirect();
      }
    })
  }
}
