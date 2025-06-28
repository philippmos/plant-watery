import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  imports: [],
  templateUrl: './auth-button.html'
})
export class AuthButton {
  protected auth: AuthService = inject(AuthService);
}
