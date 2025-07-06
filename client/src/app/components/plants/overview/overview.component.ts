import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../../services/plant.service';
import { PlantOverview } from '../../../interfaces/plant-overview';
import { OverviewItemComponent } from './overview-item/overview-item.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewItemComponent, CommonModule],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  private plantService = inject(PlantService);
  
  protected readonly items = this.plantService.plants;
  protected readonly isLoading = this.plantService.isLoading;

  async ngOnInit() {
    await this.plantService.getAllPlants();
  }

  trackById(index: number, item: PlantOverview) {
    return item.id;
  }
}
