import { Component } from '@angular/core';
import { OverviewItem } from '../overview-item/overview-item';
import { PlantService } from '../../services/plant.service';
import { computed, inject } from '@angular/core';
import { Plant } from '../../interfaces/plant';

@Component({
  selector: 'app-overview',
  imports: [OverviewItem],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview {
  private overviewService = inject(PlantService);
  readonly items = computed(() => this.overviewService.getCalculatedItems());

  trackByTitle(index: number, item: Plant) {
    return item.title;
  }
}
