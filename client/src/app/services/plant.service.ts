import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlantLocation } from '../interfaces/plant-location';
import { Plant } from '../interfaces/plant';

@Injectable({ providedIn: 'root' })
export class PlantService {
    private readonly http = inject(HttpClient);
    private readonly locationMap = signal<Map<string, PlantLocation>>(new Map());
    private readonly items = signal<Plant[]>([]);

    constructor() {
        this.loadData();
    }

    private async loadData(): Promise<void> {
        await this.loadLocations();
        await this.loadPlants();
    }

    private async loadLocations(): Promise<void> {
        const locationData = await firstValueFrom(this.http.get<PlantLocation[]>('/data/plant-locations.json'));
        
        if (locationData) {
            const locationMap = new Map(locationData.map(loc => [loc.id, loc]));
            this.locationMap.set(locationMap);
        }
    }

    private async loadPlants(): Promise<void> {
        const plantData = await firstValueFrom(this.http.get<Plant[]>('/data/plants.json'));

        if (!plantData) {
            return;
        }

        const plants: Plant[] = plantData.map(data => ({
            ...data,
            locationName: this.locationMap().get(data.locationId)?.name,
            waterHistory: data.waterHistory.map(item => ({
            ...item,
            dateTime: new Date(item.dateTime)
          }))
        }));

        this.items.set(plants);
    }

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
