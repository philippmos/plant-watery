import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PlantService } from '../../services/plant.service';
import { PlantOverview } from '../../interfaces/plant-overview';
import { DateUtils } from '../../utils/date.utils';
import { LoginPromptComponent } from '../layout/login-prompt/login-prompt.component';
import { RouterModule } from '@angular/router';
import { DashboardTileComponent, DashboardTileData } from './dashboard-tile/dashboard-tile.component';
import { WateringModalComponent } from '../shared/watering-modal/watering-modal.component';
import { PlantSectionComponent, PlantSectionConfig } from './plant-section/plant-section.component';
import { PageHeaderComponent, PageHeaderConfig } from '../shared/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoginPromptComponent, RouterModule, DashboardTileComponent, WateringModalComponent, PlantSectionComponent, PageHeaderComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private plantService = inject(PlantService);
  private authService = inject(AuthService);
  
  protected readonly isLoading = this.plantService.isLoading;
  protected readonly isAuthenticated = this.authService.isAuthenticated$;
  protected readonly allPlants = this.plantService.plants;
  
  protected readonly pageHeaderConfig: PageHeaderConfig = {
    title: 'Dashboard',
    subtitle: 'Überblick über Deine Pflanzen und deren Bewässerungsbedürfnisse',
    icon: '🌱'
  };
  
  public readonly isWateringModalOpen = signal(false);
  public readonly selectedPlantForWatering = signal<PlantOverview | null>(null);
  
  protected readonly plantsToWaterToday = computed(() => {
    return this.allPlants().filter(plant => 
      DateUtils.needsWateringToday(plant.lastWateredDateTime)
    );
  });
  
  protected readonly plantsToWaterTomorrow = computed(() => {
    return this.allPlants().filter(plant => 
      DateUtils.needsWateringTomorrow(plant.lastWateredDateTime)
    );
  });
  
  protected readonly totalPlants = computed(() => this.allPlants().length);
  
  protected readonly healthyPlants = computed(() => {
    return this.allPlants().filter(plant => 
      !DateUtils.needsWateringToday(plant.lastWateredDateTime) && 
      !DateUtils.needsWateringTomorrow(plant.lastWateredDateTime)
    ).length;
  });

  protected readonly totalPlantsData = computed((): DashboardTileData => ({
    title: 'Gesamt',
    value: this.totalPlants(),
    iconType: 'total',
    colorScheme: 'blue'
  }));

  protected readonly healthyPlantsData = computed((): DashboardTileData => ({
    title: 'Gesund',
    value: this.healthyPlants(),
    iconType: 'healthy',
    colorScheme: 'emerald'
  }));

  protected readonly waterTodayData = computed((): DashboardTileData => ({
    title: 'Heute gießen',
    value: this.plantsToWaterToday().length,
    iconType: 'water-today',
    colorScheme: 'red'
  }));

  protected readonly waterTomorrowData = computed((): DashboardTileData => ({
    title: 'Morgen gießen',
    value: this.plantsToWaterTomorrow().length,
    iconType: 'water-tomorrow',
    colorScheme: 'amber'
  }));

  protected readonly todaySectionConfig: PlantSectionConfig = {
    title: '🚨 Heute gießen',
    subtitle: 'Diese Pflanzen brauchen dringend Wasser',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
    iconBgColor: 'bg-gradient-to-br from-red-500 to-red-600',
    cardColorScheme: {
      light: 'bg-gradient-to-br from-red-50/95 to-orange-50/95',
      dark: 'dark:from-red-900/95 dark:to-orange-900/95'
    },
    borderColorScheme: {
      base: 'border border-red-200/30 dark:border-red-700/30',
      hover: 'hover:border-red-300/50 dark:hover:border-red-600/50'
    },
    textColorScheme: 'text-red-600 dark:text-red-400',
    buttonColorScheme: {
      base: 'bg-gradient-to-r from-red-500 to-red-600',
      hover: 'hover:from-red-600 hover:to-red-700'
    },
    buttonType: 'water'
  };

  protected readonly tomorrowSectionConfig: PlantSectionConfig = {
    title: '⏰ Morgen gießen',
    subtitle: 'Diese Pflanzen brauchen morgen Wasser',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    iconBgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
    cardColorScheme: {
      light: 'bg-gradient-to-br from-amber-50/95 to-yellow-50/95',
      dark: 'dark:from-amber-900/95 dark:to-yellow-900/95'
    },
    borderColorScheme: {
      base: 'border border-amber-200/30 dark:border-amber-700/30',
      hover: 'hover:border-amber-300/50 dark:hover:border-amber-600/50'
    },
    textColorScheme: 'text-amber-600 dark:text-amber-400',
    buttonColorScheme: {
      base: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hover: 'hover:from-amber-600 hover:to-amber-700'
    },
    buttonType: 'details'
  };

  async ngOnInit() {
    const isAuthenticated = await firstValueFrom(this.authService.isAuthenticated$);
    
    if (isAuthenticated) {
      await this.plantService.getAllPlants();
    }
  }

  public openWateringModal(plant: PlantOverview): void {
    this.selectedPlantForWatering.set(plant);
    this.isWateringModalOpen.set(true);
  }

  public closeWateringModal(): void {
    this.isWateringModalOpen.set(false);
    this.selectedPlantForWatering.set(null);
  }
}
