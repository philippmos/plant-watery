import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { APP_CONFIGURATION } from '../../../config/configuration';
import { AppConfig } from '../../../config/interfaces/app-config';
import { ButtonComponent } from '../../shared/ui';

@Component({
  selector: 'app-auth-button',
  imports: [ButtonComponent],
  templateUrl: './auth-button.component.html',
  standalone: true
})
export class AuthButtonComponent {
  private auth: AuthService = inject(AuthService);
  private readonly config = inject<AppConfig>(APP_CONFIGURATION);

  protected loginWithRedirect() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        ...this.config.auth.authorizationParams,
      }
    });
  }
}
