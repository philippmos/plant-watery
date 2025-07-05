import { Injectable, inject, signal } from '@angular/core';
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
    
    private _plants = signal<PlantOverview[]>([]);
    private _isLoading = signal(false);
    
    public readonly plants = this._plants.asReadonly();
    public readonly isLoading = this._isLoading.asReadonly();

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
        this._isLoading.set(true);
        try {
            const headers = await this.getAuthHeaders();
            const plantData = await firstValueFrom(this.http.get<PlantOverview[]>(this.plantApiUrl, { headers }));

            if (!plantData) {
                this._plants.set([]);
                return [];
            }

            const plants: PlantOverview[] = plantData.map(data => ({
                ...data
            }));

            this._plants.set(plants);
            return plants;
        } catch (error) {
            console.error('Error fetching plants:', error);
            this._plants.set([]);
            return [];
        } finally {
            this._isLoading.set(false);
        }
    }

    public async refreshPlants(): Promise<void> {
        await this.getAllPlants();
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
            
            await this.refreshPlants();
        } catch (e) {
            console.error('Error adding watering:', e);
            throw e;
        }
    }
}
