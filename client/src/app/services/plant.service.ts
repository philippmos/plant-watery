import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Plant } from '../interfaces/plant';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantService {
    private readonly http = inject(HttpClient);
    private readonly items = signal<Plant[]>([]);
    private readonly plantApiUrl = env.plantApiUrl;

    constructor() {
        this.loadPlants();
    }

    private async loadPlants(): Promise<void> {
        const plantData = await firstValueFrom(this.http.get<Plant[]>(this.plantApiUrl));

        if (!plantData) {
            return;
        }

        const plants: Plant[] = plantData.map(data => ({
            ...data,
            waterHistory: data.waterHistory?.map(item => ({
                ...item,
                dateTime: new Date(item.dateTime)
            })) ?? []
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
