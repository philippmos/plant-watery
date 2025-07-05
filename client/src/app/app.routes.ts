import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { Overview } from './components/overview/overview';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';

// Functional auth guard
export const authGuard = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    map(isAuth => isAuth || authService.loginWithRedirect())
  );
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Overview
  },
  {
    path: 'plants/:id',
    component: PlantDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
