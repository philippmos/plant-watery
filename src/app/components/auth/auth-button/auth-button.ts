import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-auth-button',
  imports: [AsyncPipe],
  templateUrl: './auth-button.html'
})
export class AuthButton {
  public auth: AuthService = inject(AuthService);
}
