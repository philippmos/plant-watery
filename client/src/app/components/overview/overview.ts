import { Component } from '@angular/core';
import { OverviewItem } from '../overview-item/overview-item';
import { PlantService } from '../../services/plant.service';
import { computed, inject } from '@angular/core';
import { PlantOverview } from '../../interfaces/plant-overview';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [OverviewItem, AsyncPipe],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview {
  private plantService = inject(PlantService);
  protected readonly items = computed(() => this.plantService.getAllPlants());

  trackByTitle(index: number, item: PlantOverview) {
    return item.title;
  }
}
