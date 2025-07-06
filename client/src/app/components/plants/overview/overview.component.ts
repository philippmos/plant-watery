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
  
  protected readonly items = computed(() => {
    const plants = this.allPlants();
    
    if (this.showOnlyNeedWatering()) {
      return plants.filter(plant => DateUtils.notWateredForMoreThanWeek(plant.lastWateredDateTime));
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

  protected get plantsNeedingWaterCount(): number {
    return this.allPlants().filter(plant => 
      DateUtils.notWateredForMoreThanWeek(plant.lastWateredDateTime)
    ).length;
  }
}
