import { Component, inject } from '@angular/core';
import { AuthButton } from "../../auth/auth-button/auth-button";

import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-navigation',
  imports: [AuthButton, AsyncPipe],
  templateUrl: './user-navigation.html'
})
export class UserNavigation {
  protected auth: AuthService = inject(AuthService);
}
