import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlantOverview } from '../interfaces/plant-overview';
import { environment as env } from '../../environments/environment';
import { PlantDetail } from '../interfaces/plant-detail';
import { CreateWateringRequest } from '../interfaces/create-watering-request';
import { PlantError } from '../interfaces/error';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class PlantService {
    private readonly http = inject(HttpClient);
    private readonly plantApiUrl = env.plantApiUrl;
    private readonly auth = inject(AuthService);
    
    private _plants = signal<PlantOverview[]>([]);
    private _isLoading = signal(false);
    private _error = signal<PlantError | null>(null);
    
    public readonly plants = this._plants.asReadonly();
    public readonly isLoading = this._isLoading.asReadonly();
    public readonly error = this._error.asReadonly();


    public async getAllPlants(): Promise<PlantOverview[]> {
        this._isLoading.set(true);
        this._error.set(null);
        
        try {
            const headers = await this.getAuthHeaders();
            const plantData = await firstValueFrom(this.http.get<PlantOverview[]>(this.plantApiUrl, { headers }));

            if (!plantData) {
                this._plants.set([]);
                return [];
            }

            const plants: PlantOverview[] = plantData.map(data => ({
                ...data,
                lastWateredDateTime: data.lastWateredDateTime ? new Date(data.lastWateredDateTime) : undefined
            }));

            this._plants.set(plants);
            return plants;
        } catch (error) {
            const plantError = error instanceof PlantError ? error : this.handleError(error as HttpErrorResponse);
            this._error.set(plantError);
            this._plants.set([]);
            throw plantError;
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
        } catch (error) {
            const plantError = error instanceof PlantError ? error : this.handleError(error as HttpErrorResponse);
            console.error('Error fetching plant details:', plantError);
            throw plantError;
        }
    }

    public async addWatering(plantId: string, request: CreateWateringRequest): Promise<void> {
        try {
            const headers = await this.getAuthHeaders();
            const url = `${this.plantApiUrl}/${plantId}/waterings`;
            
            await firstValueFrom(this.http.post<void>(url, request, { headers }));
            
            await this.refreshPlants();
        } catch (error) {
            const plantError = error instanceof PlantError ? error : this.handleError(error as HttpErrorResponse);
            console.error('Error adding watering:', plantError);
            throw plantError;
        }
    }

    /**
     * Retrieves the access token and builds the Authorization header.
     */
    private async getAuthHeaders(): Promise<HttpHeaders> {
        try {
            const token = await firstValueFrom(this.auth.getAccessTokenSilently());
            return new HttpHeaders({
                Authorization: `Bearer ${token}`
            });
        } catch {
            throw new PlantError('Failed to get authentication token', 401);
        }
    }

    /**
     * Handles HTTP errors and converts them to PlantError
     */
    private handleError(error: HttpErrorResponse): PlantError {
        if (error.error instanceof ErrorEvent) {
            return new PlantError('Network error occurred', 0, 'NETWORK_ERROR');
        } else {
            return new PlantError(
                error.error?.message || 'An error occurred',
                error.status,
                error.error?.code,
                error.error
            );
        }
    }
}
