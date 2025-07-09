import { Component, input } from '@angular/core';
import { CardComponent, IconContainerComponent } from '../../shared/ui';

export interface DashboardTileData {
  title: string;
  value: number;
  iconType: 'total' | 'healthy' | 'water-today' | 'water-tomorrow';
  colorScheme: 'blue' | 'emerald' | 'red' | 'amber';
}

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [CardComponent, IconContainerComponent],
  templateUrl: './dashboard-tile.component.html'
})
export class DashboardTileComponent {
  data = input.required<DashboardTileData>();

  protected getIconType(): 'plants' | 'check-circle' | 'clock' | 'sun' {
    switch (this.data().iconType) {
      case 'total':
        return 'plants';
      case 'healthy':
        return 'check-circle';
      case 'water-today':
        return 'clock';
      case 'water-tomorrow':
        return 'sun';
      default:
        return 'plants';
    }
  }

  protected getIconVariant(): 'emerald' | 'blue' | 'red' | 'amber' {
    return this.data().colorScheme;
  }

  protected getCardVariant(): 'emerald' | 'blue' | 'red' | 'amber' {
    return this.data().colorScheme;
  }
}
