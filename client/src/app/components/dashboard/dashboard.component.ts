import { Component, OnInit, inject, computed } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PlantService } from '../../services/plant.service';
import { PlantOverview } from '../../interfaces/plant-overview';
import { DateUtils } from '../../utils/date.utils';
import { LoginPrompt } from '../layout/login-prompt/login-prompt';
import { RouterModule } from '@angular/router';
import { DashboardTileComponent, DashboardTileData } from './dashboard-tile/dashboard-tile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoginPrompt, RouterModule, DashboardTileComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private plantService = inject(PlantService);
  private authService = inject(AuthService);
  
  protected readonly isLoading = this.plantService.isLoading;
  protected readonly isAuthenticated = this.authService.isAuthenticated$;
  protected readonly allPlants = this.plantService.plants;
  
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

  async ngOnInit() {
    const isAuthenticated = await firstValueFrom(this.authService.isAuthenticated$);
    
    if (isAuthenticated) {
      await this.plantService.getAllPlants();
    }
  }

  protected getRelativeTime(date: Date | undefined): string {
    if (!date) return 'Noch nie';
    return DateUtils.getRelativeTime(date);
  }

  protected getUrgencyClass(plant: PlantOverview): string {
    if (DateUtils.needsWateringToday(plant.lastWateredDateTime)) {
      return 'border-red-500/40 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20';
    } else if (DateUtils.needsWateringTomorrow(plant.lastWateredDateTime)) {
      return 'border-amber-500/40 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/20 dark:to-yellow-900/20';
    }
    return 'border-emerald-500/40 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20';
  }

  protected getUrgencyIcon(plant: PlantOverview): string {
    if (DateUtils.needsWateringToday(plant.lastWateredDateTime)) {
      return 'text-red-600 dark:text-red-400';
    } else if (DateUtils.needsWateringTomorrow(plant.lastWateredDateTime)) {
      return 'text-amber-600 dark:text-amber-400';
    }
    return 'text-emerald-600 dark:text-emerald-400';
  }
}
