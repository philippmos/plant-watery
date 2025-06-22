import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OverviewItemData } from '../../interfaces/overview-item-data';

@Component({
  selector: 'app-overview-item',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './overview-item.html',
  styleUrls: ['./overview-item.scss']
})
export class OverviewItem {
  @Input() data!: OverviewItemData;

  get plantLink(): string {
    return `/plants/${this.data.id}`;
  }
}
