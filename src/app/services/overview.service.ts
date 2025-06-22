import { Injectable, signal } from '@angular/core';
import { OverviewItemData } from '../interfaces/overview-item-data';

@Injectable({ providedIn: 'root' })
export class OverviewService {
  readonly items = signal<OverviewItemData[]>([
    {
      id: 'b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Yucca-Palme',
      location: 'Arbeitszimmer'
    },
    {
      id: 'c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-17'),
      title: 'Bogenhanf',
      location: 'Arbeitszimmer'
    },
    {
      id: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Bonsai Japanische Feige',
      location: 'Wohnzimmer'
    },
    {
      id: 'a2b3c4d5-e6f7-8901-2345-6789abcdef12',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-22'),
      title: 'Erdbeersaat',
      location: 'Wohnzimmer'
    }
  ]);
}
