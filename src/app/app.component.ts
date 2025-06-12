import { Component } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
  ],
  template: `
    <div class="app-container">
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
  `],
  // providers: [
  //   provideAuth0({
  //     domain: 'dev-gqsvyp352yztcuds.eu.auth0.com',
  //     clientId: 'e1Kd1fLJVCvhiDbzQhnrDzRSkWM6czQw',
  //     authorizationParams: {
  //       redirect_uri: window.location.origin
  //     }
  //   })
  // ]
})
export class AppComponent {

}
