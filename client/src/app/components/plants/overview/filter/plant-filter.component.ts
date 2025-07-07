import { Component, input, output, computed, signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantOverview } from '../../../../interfaces/plant-overview';

@Component({
  selector: 'app-plant-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-filter.component.html'
})
export class PlantFilterComponent {
  private elementRef = inject(ElementRef);
  
  allPlants = input.required<PlantOverview[]>();
  isFilterActive = input.required<boolean>();
  plantsNeedingWaterCount = input.required<number>();
  selectedLocation = input<string | null>(null);
  
  filterToggle = output<void>();
  locationChange = output<string | null>();
  
  protected readonly showLocationFilter = signal(false);
  
  protected readonly availableLocations = computed(() => {
    const locations = this.allPlants()
      .map(plant => plant.locationName)
      .filter((location, index, array) => array.indexOf(location) === index)
      .sort();
    return locations;
  });
  
  protected readonly locationFilteredCount = computed(() => {
    if (!this.selectedLocation()) return this.allPlants().length;
    return this.allPlants().filter(plant => 
      plant.locationName === this.selectedLocation()
    ).length;
  });
  
  protected readonly locationCounts = computed(() => {
    const counts = new Map<string, number>();
    this.allPlants().forEach(plant => {
      counts.set(plant.locationName, (counts.get(plant.locationName) || 0) + 1);
    });
    return counts;
  });
  
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.showLocationFilter.set(false);
    }
  }
  
  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    this.showLocationFilter.set(false);
  }
  
  protected onToggleFilter(): void {
    this.filterToggle.emit();
  }
  
  protected onLocationChange(location: string | null): void {
    this.locationChange.emit(location);
  }
  
  protected toggleLocationFilter(): void {
    this.showLocationFilter.update(value => !value);
  }
}
