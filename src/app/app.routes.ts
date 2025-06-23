import { Routes } from '@angular/router';
import { Overview } from './components/overview/overview';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Overview,
  },
  {
    path: 'plants/:id',
    component: PlantDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
