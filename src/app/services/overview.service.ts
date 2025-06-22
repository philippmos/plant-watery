import { Injectable, signal } from '@angular/core';
import { OverviewItemData } from '../components/overview-item/overview-item';

@Injectable({ providedIn: 'root' })
export class OverviewService {
  readonly items = signal<OverviewItemData[]>([
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Yucca-Palme',
      location: 'Arbeitszimmer'
    },
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-17'),
      title: 'Bogenhanf',
      location: 'Arbeitszimmer'
    },
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Bonsai Japanische Feige',
      location: 'Wohnzimmer'
    }
  ]);
}
