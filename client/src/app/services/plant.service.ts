import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlantOverview } from '../interfaces/plant-overview';
import { environment as env } from '../../environments/environment';
import { PlantDetail } from '../interfaces/plant-detail';

@Injectable({ providedIn: 'root' })
export class PlantService {
    private readonly http = inject(HttpClient);
    private readonly plantApiUrl = env.plantApiUrl;

    public async getAllPlants(): Promise<PlantOverview[]> {
        const plantData = await firstValueFrom(this.http.get<PlantOverview[]>(this.plantApiUrl));

        if (!plantData) {
            return [];
        }

        const plants: PlantOverview[] = plantData.map(data => ({
            ...data
        }));

        return plants;
    }

    public async getPlantById(id: string): Promise<PlantDetail | undefined> {
        try {
            const url = `${this.plantApiUrl}/${id}`;
            const data = await firstValueFrom(this.http.get<PlantDetail>(url));
            if (!data) {
                return undefined;
            }

            return {
                ...data,
                wateringEvents: data.wateringEvents?.map(e => ({
                    ...e,
                    dateTime: new Date(e.dateTime)
                })) ?? []
            };
        } catch (e) {
            console.error('Error fetching plant details:', e);
            return undefined;
        }
    }
}
