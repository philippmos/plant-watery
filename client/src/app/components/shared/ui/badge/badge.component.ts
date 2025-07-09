import { Component, input } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: `
    <div [class]="getBadgeClasses()">
      @if (icon()) {
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path [attr.d]="icon()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      }
      <ng-content></ng-content>
      @if (count() !== undefined) {
        <span class="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold">
          {{ count() }}
        </span>
      }
    </div>
  `
})
export class BadgeComponent {
  variant = input<BadgeVariant>('primary');
  size = input<BadgeSize>('md');
  icon = input<string>();
  count = input<number>();
  pill = input<boolean>(false);

  protected getBadgeClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium backdrop-blur-sm transition-all duration-200';
    
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();
    const shapeClasses = this.pill() ? 'rounded-full' : 'rounded-lg';
    
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${shapeClasses}`;
  }

  private getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'primary':
        return 'bg-emerald-100/80 dark:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30';
      case 'secondary':
        return 'bg-green-100/80 dark:bg-green-800/40 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-700/30';
      case 'success':
        return 'bg-emerald-100/80 dark:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30';
      case 'warning':
        return 'bg-amber-100/80 dark:bg-amber-800/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/30';
      case 'danger':
        return 'bg-red-100/80 dark:bg-red-800/40 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-700/30';
      case 'info':
        return 'bg-blue-100/80 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30';
      case 'light':
        return 'bg-gray-100/80 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/30';
      case 'dark':
        return 'bg-gray-800/80 dark:bg-gray-200/80 text-gray-200 dark:text-gray-800 border border-gray-700/50 dark:border-gray-300/50';
      default:
        return 'bg-emerald-100/80 dark:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30';
    }
  }
}
