import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantOverview } from '../../../../interfaces/plant-overview';

@Component({
  selector: 'app-plant-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-filter.component.html'
})
export class PlantFilterComponent {
  allPlants = input.required<PlantOverview[]>();
  isFilterActive = input.required<boolean>();
  plantsNeedingWaterCount = input.required<number>();
  
  filterToggle = output<void>();
  
  protected onToggleFilter(): void {
    this.filterToggle.emit();
  }
}
