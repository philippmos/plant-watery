import { Component } from '@angular/core';
import { OverviewItem, OverviewItemData } from '../overview-item/overview-item';
import { OverviewService } from '../../services/overview.service';
import { computed, inject } from '@angular/core';

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
