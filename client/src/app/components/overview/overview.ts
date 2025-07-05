import { Component, OnInit, inject } from '@angular/core';
import { OverviewItem } from '../overview-item/overview-item';
import { PlantService } from '../../services/plant.service';
import { PlantOverview } from '../../interfaces/plant-overview';

@Component({
  selector: 'app-overview',
  imports: [OverviewItem],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview implements OnInit {
  private plantService = inject(PlantService);
  
  protected readonly items = this.plantService.plants;
  protected readonly isLoading = this.plantService.isLoading;

  async ngOnInit() {
    await this.plantService.getAllPlants();
  }

  trackByTitle(index: number, item: PlantOverview) {
    return item.title;
  }
}
