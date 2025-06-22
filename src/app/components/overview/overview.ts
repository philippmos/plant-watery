import { Component } from '@angular/core';
import { OverviewItem } from '../overview-item/overview-item';
import { OverviewService } from '../../services/overview.service';
import { computed, inject } from '@angular/core';
import { OverviewItemData } from '../../interfaces/overview-item-data';

@Component({
  selector: 'app-overview',
  imports: [OverviewItem],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview {
  private overviewService = inject(OverviewService);
  readonly items = computed(() => this.overviewService.items());

  trackByTitle(index: number, item: OverviewItemData) {
    return item.title;
  }
}
