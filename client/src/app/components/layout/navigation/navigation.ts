import { Component, signal } from '@angular/core';
import { UserNavigation } from "../user-navigation/user-navigation";

@Component({
  selector: 'app-navigation',
  imports: [UserNavigation],
  templateUrl: './navigation.html',
  standalone: true
})
export class Navigation {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }
}
