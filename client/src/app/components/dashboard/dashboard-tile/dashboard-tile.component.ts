import { Component, input } from '@angular/core';

export interface DashboardTileData {
  title: string;
  value: number;
  iconType: 'total' | 'healthy' | 'water-today' | 'water-tomorrow';
  colorScheme: 'blue' | 'emerald' | 'red' | 'amber';
}

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-tile.component.html'
})
export class DashboardTileComponent {
  data = input.required<DashboardTileData>();

  protected getColorClasses(): string {
    const colorScheme = this.data().colorScheme;
    
    switch (colorScheme) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-50/95 to-indigo-50/95 dark:from-blue-900/95 dark:to-indigo-900/95 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-50/95 to-green-50/95 dark:from-emerald-900/95 dark:to-green-900/95 border-emerald-200/30 dark:border-emerald-700/30 hover:border-emerald-300/50 dark:hover:border-emerald-600/50';
      case 'red':
        return 'bg-gradient-to-br from-red-50/95 to-orange-50/95 dark:from-red-900/95 dark:to-orange-900/95 border-red-200/30 dark:border-red-700/30 hover:border-red-300/50 dark:hover:border-red-600/50';
      case 'amber':
        return 'bg-gradient-to-br from-amber-50/95 to-yellow-50/95 dark:from-amber-900/95 dark:to-yellow-900/95 border-amber-200/30 dark:border-amber-700/30 hover:border-amber-300/50 dark:hover:border-amber-600/50';
      default:
        return 'bg-gradient-to-br from-gray-50/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border-gray-200/30 dark:border-gray-700/30';
    }
  }

  protected getTextColorClasses(): string {
    const colorScheme = this.data().colorScheme;
    
    switch (colorScheme) {
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
      case 'emerald':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'red':
        return 'text-red-600 dark:text-red-400';
      case 'amber':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  protected getValueColorClasses(): string {
    const colorScheme = this.data().colorScheme;
    
    switch (colorScheme) {
      case 'blue':
        return 'text-blue-900 dark:text-blue-100';
      case 'emerald':
        return 'text-emerald-900 dark:text-emerald-100';
      case 'red':
        return 'text-red-900 dark:text-red-100';
      case 'amber':
        return 'text-amber-900 dark:text-amber-100';
      default:
        return 'text-gray-900 dark:text-gray-100';
    }
  }

  protected getIconColorClasses(): string {
    const colorScheme = this.data().colorScheme;
    
    switch (colorScheme) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-500 to-emerald-600';
      case 'red':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'amber':
        return 'bg-gradient-to-br from-amber-500 to-amber-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  }
}
