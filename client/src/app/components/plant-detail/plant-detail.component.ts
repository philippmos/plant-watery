import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { PlantDetail } from '../../interfaces/plant-detail';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent {
  private route = inject(ActivatedRoute);
  private plantService = inject(PlantService);

  protected readonly plant = signal<PlantDetail | undefined>(undefined);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.loadPlant();
    });
  }

  private async loadPlant(): Promise<void> {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (!plantId) {
      this.error.set('Plant ID not found');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    
    try {
      const plantData = await this.plantService.getPlantById(plantId);
      this.plant.set(plantData);
    } catch (error) {
      this.error.set('Failed to load plant details');
      console.error('Error loading plant:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
