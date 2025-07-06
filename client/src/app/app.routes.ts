import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { OverviewComponent } from './components/plants/overview/overview.component';
import { PlantDetailComponent } from './components/plants/plant-detail/plant-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    component: DashboardComponent
  },
  {
    path: 'plants',
    component: OverviewComponent
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
