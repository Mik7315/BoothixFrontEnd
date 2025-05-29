import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
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
  `]
})
export class AppComponent {

}
