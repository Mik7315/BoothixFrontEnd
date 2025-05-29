import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
  <nav class="navbar navbar-expand-md navbar-dark fixed-top rounded">
    <div class="container-fluid">
      <a class="d-none d-md-block navbar-brand p-3" href="#">
        <img src="assets/boothix.png" alt="Boothix logo" height="30" />
      </a>
      <a class="d-md-none navbar-brand p-3" href="#">
        <img src="assets/boothix-icon.png" alt="Boothix logo" height="30" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="p-3 fs-3 nav-link" routerLinkActive="active" aria-current="page" routerLink="/client">Clients</a>
          </li>
          <li class="nav-item">
            <a class="p-3 fs-3 nav-link" routerLinkActive="active" routerLink="#">Appareils</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  styles: [`
    .navbar {
      background-color: #2E2E2C;
    }
  `]
})
export class MenuComponent {

}
