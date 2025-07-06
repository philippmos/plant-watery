import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantOverview } from '../../../interfaces/plant-overview';
import { DateUtils } from '../../../utils/date.utils';

export interface PlantSectionConfig {
  title: string;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  cardColorScheme: {
    light: string;
    dark: string;
  };
  borderColorScheme: {
    base: string;
    hover: string;
  };
  textColorScheme: string;
  buttonColorScheme: {
    base: string;
    hover: string;
  };
  buttonType: 'water' | 'details';
}

@Component({
  selector: 'app-plant-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './plant-section.component.html'
})
export class PlantSectionComponent {
  @Input({ required: true }) plants: PlantOverview[] = [];
  @Input({ required: true }) config!: PlantSectionConfig;
  @Output() plantWatering = new EventEmitter<PlantOverview>();

  protected getRelativeTime(date: Date | undefined): string {
    if (!date) return 'Noch nie';
    return DateUtils.getRelativeTime(date);
  }

  protected onPlantAction(plant: PlantOverview): void {
    if (this.config.buttonType === 'water') {
      this.plantWatering.emit(plant);
    }
  }
}
