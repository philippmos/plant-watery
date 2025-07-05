import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-prompt',
  standalone: true,
  imports: [],
  templateUrl: './login-prompt.html'
})
export class LoginPrompt {
  private authService = inject(AuthService);

  login() {
    this.authService.loginWithRedirect();
  }
}
