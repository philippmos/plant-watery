import { Component, signal } from '@angular/core';
import { UserNavigationComponent } from "../user-navigation/user-navigation.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [UserNavigationComponent, RouterLink],
  templateUrl: './navigation.component.html',
  standalone: true
})
export class NavigationComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }
}
