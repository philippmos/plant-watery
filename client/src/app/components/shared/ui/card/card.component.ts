import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type CardVariant = 'default' | 'emerald' | 'blue' | 'amber' | 'red' | 'purple' | 'gray';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [class]="getCardClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  variant = input<CardVariant>('default');
  hoverable = input<boolean>(true);
  shadow = input<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('xl');
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  rounded = input<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('xl');

  protected getCardClasses(): string {
    const baseClasses = 'backdrop-blur-sm border transition-all duration-300 ease-in-out';
    
    const variantClasses = this.getVariantClasses();
    const hoverClasses = this.hoverable() ? 'hover:shadow-2xl hover:border-opacity-60' : '';
    const shadowClasses = this.getShadowClasses();
    const paddingClasses = this.getPaddingClasses();
    const roundedClasses = this.getRoundedClasses();
    
    return `${baseClasses} ${variantClasses} ${hoverClasses} ${shadowClasses} ${paddingClasses} ${roundedClasses}`;
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-50/95 to-green-50/95 dark:from-emerald-900/95 dark:to-green-900/95 border-emerald-200/30 dark:border-emerald-700/30 hover:border-emerald-300/50 dark:hover:border-emerald-600/50';
      case 'blue':
        return 'bg-gradient-to-br from-blue-50/95 to-indigo-50/95 dark:from-blue-900/95 dark:to-indigo-900/95 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50';
      case 'amber':
        return 'bg-gradient-to-br from-amber-50/95 to-yellow-50/95 dark:from-amber-900/95 dark:to-yellow-900/95 border-amber-200/30 dark:border-amber-700/30 hover:border-amber-300/50 dark:hover:border-amber-600/50';
      case 'red':
        return 'bg-gradient-to-br from-red-50/95 to-orange-50/95 dark:from-red-900/95 dark:to-orange-900/95 border-red-200/30 dark:border-red-700/30 hover:border-red-300/50 dark:hover:border-red-600/50';
      case 'purple':
        return 'bg-gradient-to-br from-purple-50/95 to-indigo-50/95 dark:from-purple-900/95 dark:to-indigo-900/95 border-purple-200/30 dark:border-purple-700/30 hover:border-purple-300/50 dark:hover:border-purple-600/50';
      case 'gray':
        return 'bg-gradient-to-br from-gray-50/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border-gray-200/30 dark:border-gray-700/30 hover:border-gray-300/50 dark:hover:border-gray-600/50';
      default:
        return 'bg-gradient-to-br from-white/95 to-emerald-50/95 dark:from-gray-900/95 dark:to-emerald-900/95 border-emerald-200/40 dark:border-emerald-700/40 hover:border-emerald-300/60 dark:hover:border-emerald-600/60';
    }
  }

  private getShadowClasses(): string {
    switch (this.shadow()) {
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      case 'xl':
        return 'shadow-xl';
      case '2xl':
        return 'shadow-2xl';
      default:
        return 'shadow-xl';
    }
  }

  private getPaddingClasses(): string {
    switch (this.padding()) {
      case 'none':
        return '';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  }

  private getRoundedClasses(): string {
    switch (this.rounded()) {
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case '2xl':
        return 'rounded-2xl';
      default:
        return 'rounded-xl';
    }
  }
}
