import { Injectable, signal } from '@angular/core';
import { Plant } from '../interfaces/plant';
import { PlantLocation } from '../interfaces/plant-location';

const locations: PlantLocation[] = [
  { id: 'b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c', name: 'Arbeitszimmer' },
  { id: 'c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f', name: 'Wohnzimmer' },
  { id: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0', name: 'Wohnzimmer Vitrine' }
];

@Injectable({ providedIn: 'root' })
export class OverviewService {
  private readonly locationMap = new Map(locations.map(loc => [loc.id, loc]));

  readonly items = signal<Plant[]>([
    {
      id: 'b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Yucca-Palme',
      location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!
    },
    {
      id: 'c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-17'),
      title: 'Bogenhanf',
      location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!
    },
    {
      id: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Bonsai Japanische Feige',
      location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!
    },
    {
      id: 'a2b3c4d5-e6f7-8901-2345-6789abcdef12',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-22'),
      title: 'Erdbeersaat',
      location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!
    },
    {
      id: 'e1f2a3b4-c5d6-7890-1234-56789abcdef1',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-20'),
      title: 'Bogehnanf Straight',
      location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!
    },
    {
      id: 'b2c3d4e5-f6a7-8901-2345-6789abcdef23',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-20'),
      title: 'Lanzenrosette',
      location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!
    },
    {
      id: 'c4d5e6f7-a8b9-0123-4567-89abcdef3456',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-20'),
      title: 'Orchidee',
      location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!
    },
    {
      id: 'd5e6f7a8-b9c0-1234-5678-9abcdef45678',
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-20'),
      title: 'Efeu',
      location: this.locationMap.get('f1e2d3c4-b5a6-7890-1234-56789abcdef0')!
    }
  ]);
}