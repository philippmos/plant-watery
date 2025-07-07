import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../../services/plant.service';
import { PlantOverview } from '../../../interfaces/plant-overview';
import { OverviewItemComponent } from './overview-item/overview-item.component';
import { PageHeaderComponent, PageHeaderConfig } from '../../shared/page-header/page-header.component';
import { PlantFilterComponent } from './filter/plant-filter.component';
import { DateUtils } from '../../../utils/date.utils';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewItemComponent, CommonModule, PageHeaderComponent, PlantFilterComponent],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  private plantService = inject(PlantService);
  
  protected readonly allPlants = this.plantService.plants;
  protected readonly isLoading = this.plantService.isLoading;
  
  protected readonly showOnlyNeedWatering = signal(false);
  protected readonly selectedLocation = signal<string | null>(null);

  /**
   * Gets the watering interval for a plant, falling back to 7 days if not specified
   */
  private getWateringInterval(plant: PlantOverview): number {
    return plant.wateringIntervalInDays || 7;
  }
  
  protected readonly items = computed(() => {
    let plants = this.allPlants();
    
    if (this.selectedLocation()) {
      plants = plants.filter(plant => plant.locationName === this.selectedLocation());
    }
    
    if (this.showOnlyNeedWatering()) {
      plants = plants.filter((plant: PlantOverview) => DateUtils.notWateredForMoreThanInterval(plant.lastWateredDateTime, this.getWateringInterval(plant)));
    }
    
    return plants;
  });
  
  protected readonly pageHeaderConfig: PageHeaderConfig = {
    title: 'Pflanzen-Übersicht',
    subtitle: 'Alle Deine Pflanzen auf einen Blick',
    icon: '🌿'
  };

  async ngOnInit() {
    await this.plantService.getAllPlants();
  }

  trackById(index: number, item: PlantOverview) {
    return item.id;
  }

  protected toggleFilter() {
    this.showOnlyNeedWatering.update(value => !value);
  }
  
  protected onLocationChange(location: string | null) {
    this.selectedLocation.set(location);
  }

  protected get plantsNeedingWaterCount(): number {
    let plants = this.allPlants();
    
    if (this.selectedLocation()) {
      plants = plants.filter(plant => plant.locationName === this.selectedLocation());
    }
    
    return plants.filter((plant: PlantOverview) => 
      DateUtils.notWateredForMoreThanInterval(plant.lastWateredDateTime, this.getWateringInterval(plant))
    ).length;
  }
}
