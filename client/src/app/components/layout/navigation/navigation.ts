import { Component, signal } from '@angular/core';
import { UserNavigation } from "../user-navigation/user-navigation";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [UserNavigation, RouterLink],
  templateUrl: './navigation.html',
  standalone: true
})
export class Navigation {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }
}
