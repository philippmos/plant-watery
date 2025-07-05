import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlantOverview } from '../interfaces/plant-overview';
import { environment as env } from '../../environments/environment';
import { PlantDetail } from '../interfaces/plant-detail';
import { CreateWateringRequest } from '../interfaces/create-watering-request';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class PlantService {
    private readonly http = inject(HttpClient);
    private readonly plantApiUrl = env.plantApiUrl;
    private readonly auth = inject(AuthService);

    /**
     * Retrieves the access token and builds the Authorization header.
     */
    private async getAuthHeaders(): Promise<HttpHeaders> {
        const token = await firstValueFrom(this.auth.getAccessTokenSilently());
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

    public async getAllPlants(): Promise<PlantOverview[]> {
        const headers = await this.getAuthHeaders();
        const plantData = await firstValueFrom(this.http.get<PlantOverview[]>(this.plantApiUrl, { headers }));

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
            const headers = await this.getAuthHeaders();
            const url = `${this.plantApiUrl}/${id}`;
            const data = await firstValueFrom(this.http.get<PlantDetail>(url, { headers }));
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

    public async addWatering(plantId: string, request: CreateWateringRequest): Promise<void> {
        try {
            const headers = await this.getAuthHeaders();
            const url = `${this.plantApiUrl}/${plantId}/waterings`;
            
            await firstValueFrom(this.http.post<void>(url, request, { headers }));
        } catch (e) {
            console.error('Error adding watering:', e);
            throw e;
        }
    }
}
