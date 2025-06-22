import { Component } from '@angular/core';
import { OverviewItem, OverviewItemData } from '../overview-item/overview-item';

@Component({
  selector: 'app-overview',
  imports: [OverviewItem],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview {
  items: OverviewItemData[] = [
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Yucca-Palme',
      location: 'Arbeitszimmer'
    },
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-17'),
      title: 'Bogenhanf',
      location: 'Arbeitszimmer'
    },
    {
      imageUrl: 'https://placehold.co/558x358',
      lastWateredDate: new Date('2025-06-21'),
      title: 'Bonsai Japanische Feige',
      location: 'Wohnzimmer'
    }
  ];

  trackByTitle(index: number, item: OverviewItemData) {
    return item.title;
  }
}
