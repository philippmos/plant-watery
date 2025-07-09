import { Component, input } from '@angular/core';
import { IconComponent, IconType } from '../icon/icon.component';

export type IconContainerVariant = 'emerald' | 'blue' | 'amber' | 'red' | 'purple' | 'gray' | 'teal';
export type IconContainerSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-icon-container',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div [class]="getContainerClasses()">
      <app-icon [type]="icon()" [size]="getIconSize()" color="white"></app-icon>
    </div>
  `
})
export class IconContainerComponent {
  icon = input.required<IconType>();
  variant = input<IconContainerVariant>('emerald');
  size = input<IconContainerSize>('md');
  rounded = input<'md' | 'lg' | 'xl' | 'full'>('lg');
  shadow = input<boolean>(true);

  protected getContainerClasses(): string {
    const baseClasses = 'flex items-center justify-center flex-shrink-0';
    
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();
    const roundedClasses = this.getRoundedClasses();
    const shadowClasses = this.shadow() ? 'shadow-lg' : '';
    
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${shadowClasses}`;
  }

  protected getIconSize(): 'sm' | 'md' | 'lg' | 'xl' {
    switch (this.size()) {
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      case 'xl':
        return 'xl';
      default:
        return 'md';
    }
  }

  private getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-12 h-12';
      case 'xl':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-600 to-green-700';
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'amber':
        return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'red':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'purple':
        return 'bg-gradient-to-br from-purple-500 to-indigo-600';
      case 'teal':
        return 'bg-gradient-to-br from-teal-600 to-cyan-700';
      case 'gray':
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
      default:
        return 'bg-gradient-to-br from-emerald-600 to-green-700';
    }
  }

  private getRoundedClasses(): string {
    switch (this.rounded()) {
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  }
}
