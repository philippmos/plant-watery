import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PlantDetail } from '../../../../interfaces/plant-detail';
import { FeatureCardComponent, IconContainerComponent, BadgeComponent } from '../../../shared/ui';

@Component({
  selector: 'app-watering-interval',
  imports: [JsonPipe, FeatureCardComponent, IconContainerComponent, BadgeComponent],
  standalone: true,
  templateUrl: './watering-interval.component.html'
})
export class WateringIntervalComponent {
  wateringIntervalInDays = input<number | null | undefined>(); 
  plantData = input<PlantDetail>();

  protected getFrequencyDescription(): string {
    const days = this.wateringIntervalInDays();
    if (!days || days <= 0) return '';
    
    if (days === 1) {
      return 'Diese Pflanze sollte täglich gegossen werden';
    } else if (days <= 3) {
      return 'Diese Pflanze benötigt häufige Bewässerung';
    } else if (days <= 7) {
      return 'Diese Pflanze benötigt regelmäßige Bewässerung';
    } else {
      return 'Diese Pflanze ist pflegeleicht und benötigt seltene Bewässerung';
    }
  }

  protected getDayLabel(): string {
    const days = this.wateringIntervalInDays();
    return days === 1 ? 'Tag' : 'Tage';
  }

  protected getBadgeVariant(): 'success' | 'warning' | 'info' | 'primary' {
    const days = this.wateringIntervalInDays();
    if (!days || days <= 0) return 'primary';
    
    if (days === 1) return 'warning';
    if (days <= 3) return 'info'; 
    if (days <= 7) return 'success';
    return 'primary';
  }
}
