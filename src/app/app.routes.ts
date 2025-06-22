import { Routes } from '@angular/router';
import { Overview } from './components/overview/overview';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Overview,
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
