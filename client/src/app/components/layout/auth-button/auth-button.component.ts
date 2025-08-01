import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonComponent } from '../../shared/ui';

@Component({
  selector: 'app-auth-button',
  imports: [ButtonComponent],
  templateUrl: './auth-button.component.html',
  standalone: true
})
export class AuthButtonComponent {
  private auth: AuthService = inject(AuthService);

  protected loginWithRedirect() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        audience: 'http://plant-watery.local',
      }
    });
  }
}
