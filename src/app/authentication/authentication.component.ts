import { Component } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-authentication',
  template: `
    <button (click)="auth.loginWithRedirect()">Log in</button>
  `,
  styles: [''],
  standalone: true
})
export class AuthenticationComponent {
  constructor(public auth: AuthService) { }
}
