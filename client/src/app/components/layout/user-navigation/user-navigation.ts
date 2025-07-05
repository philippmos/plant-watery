import { Component, inject, signal, HostListener } from '@angular/core';
import { AuthButton } from "../../auth/auth-button/auth-button";

import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-navigation',
  imports: [AuthButton, AsyncPipe],
  templateUrl: './user-navigation.html',
  standalone: true
})
export class UserNavigation {
  protected auth: AuthService = inject(AuthService);
  
  // Signal für das Dropdown-Menu (mobile & desktop)
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  // Dropdown schließen, wenn außerhalb geklickt wird
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('app-user-navigation');
    
    if (!dropdown && this.isDropdownOpen()) {
      this.closeDropdown();
    }
  }
}
