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

    private readonly items = signal<Plant[]>([
        {
            id: 'b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Yucca-Palme',
            location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!,
            waterHistory: [
                { id: '1', dateTime: new Date('2025-06-21T10:00:00Z'), comment: 'Gut gegossen' },
                { id: '2', dateTime: new Date('2025-06-20T10:00:00Z') }
            ]
        },
        {
            id: 'c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Bogenhanf',
            location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!,
            waterHistory: []
        },
        {
            id: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Bonsai Japanische Feige',
            location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!,
            waterHistory: []
        },
        {
            id: 'a2b3c4d5-e6f7-8901-2345-6789abcdef12',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Erdbeersaat',
            location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!,
            waterHistory: []
        },
        {
            id: 'e1f2a3b4-c5d6-7890-1234-56789abcdef1',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Bogehnanf Straight',
            location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!,
            waterHistory: []
        },
        {
            id: 'b2c3d4e5-f6a7-8901-2345-6789abcdef23',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Lanzenrosette',
            location: this.locationMap.get('b8e2a1c0-7f3e-4e2b-9c2a-1d2e3f4a5b6c')!,
            waterHistory: []
        },
        {
            id: 'c4d5e6f7-a8b9-0123-4567-89abcdef3456',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Orchidee',
            location: this.locationMap.get('c3d4e5f6-1a2b-3c4d-5e6f-7a8b9c0d1e2f')!,
            waterHistory: []
        },
        {
            id: 'd5e6f7a8-b9c0-1234-5678-9abcdef45678',
            imageUrl: 'https://placehold.co/558x358',
            title: 'Efeu',
            location: this.locationMap.get('f1e2d3c4-b5a6-7890-1234-56789abcdef0')!,
            waterHistory: []
        }
    ]);

    public getCalculatedItems(): Plant[] {
        return this.items().map(item => {
            if (item.waterHistory && item.waterHistory.length > 0) {
                const latestEntry = item.waterHistory.reduce((latest, current) => 
                    current.dateTime > latest.dateTime ? current : latest
                );
                return {
                    ...item,
                    lastWatered: latestEntry.dateTime
                };
            }
            return item;
        });
    }

    getPlantById(id: string): Plant | undefined {
        return this.items().find(plant => plant.id === id);
    }
}
