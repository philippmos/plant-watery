import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface OverviewItemData {
  imageUrl: string;
  lastWateredDate: Date;
  title: string;
  location: string;
}

@Component({
  selector: 'app-overview-item',
  imports: [DatePipe],
  templateUrl: './overview-item.html',
  styleUrls: ['./overview-item.scss']
})
export class OverviewItem {
  @Input() data!: OverviewItemData;
}
