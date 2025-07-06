import { Component, signal, OnInit, OnDestroy, inject, computed } from '@angular/core';
import { UserNavigationComponent } from "../user-navigation/user-navigation.component";
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface NavigationItem {
  path: string;
  label: string;
  exactMatch?: boolean;
  aliases?: string[];
}

@Component({
  selector: 'app-navigation',
  imports: [UserNavigationComponent, RouterLink],
  templateUrl: './navigation.component.html',
  standalone: true
})
export class NavigationComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  
  isMobileMenuOpen = signal(false);
  activeRoute = signal<string>('');
  private destroy$ = new Subject<void>();

  readonly navigationItems: NavigationItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      exactMatch: true,
      aliases: ['/']
    },
    {
      path: '/plants',
      label: 'Meine Pflanzen',
      exactMatch: false
    },
    {
      path: '/calendar',
      label: 'Kalender',
      exactMatch: false
    }
  ];

  activeNavigationItem = computed(() => {
    const currentRoute = this.activeRoute();
    return this.navigationItems.find(item => this.isRouteActive(currentRoute, item));
  });

  ngOnInit() {
    this.activeRoute.set(this.router.url);
    
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.activeRoute.set(event.url);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  isActiveRoute(route: string): boolean {
    const currentRoute = this.activeRoute();
    const navItem = this.navigationItems.find(item => item.path === route);
    
    if (!navItem) return false;
    
    return this.isRouteActive(currentRoute, navItem);
  }

  private isRouteActive(currentRoute: string, navItem: NavigationItem): boolean {
    if (navItem.aliases?.includes(currentRoute)) {
      return true;
    }
    
    if (navItem.exactMatch) {
      return currentRoute === navItem.path;
    }
    
    return currentRoute.startsWith(navItem.path);
  }
}
