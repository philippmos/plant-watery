import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingVariant = 'spinner' | 'pulse' | 'bounce';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgClass],
  template: `
    @if (variant() === 'spinner') {
      <div [class]="getSpinnerClasses()"></div>
    }
    
    @if (variant() === 'pulse') {
      <div [class]="getPulseClasses()"></div>
    }
    
    @if (variant() === 'bounce') {
      <div class="flex space-x-1">
        <div [class]="getBounceClasses() + ' animation-delay-0'"></div>
        <div [class]="getBounceClasses() + ' animation-delay-150'"></div>
        <div [class]="getBounceClasses() + ' animation-delay-300'"></div>
      </div>
    }
    
    @if (text()) {
      <p [class]="getTextClasses()">{{ text() }}</p>
    }
  `,
  styles: [`
    .animation-delay-0 {
      animation-delay: 0ms;
    }
    .animation-delay-150 {
      animation-delay: 150ms;
    }
    .animation-delay-300 {
      animation-delay: 300ms;
    }
  `]
})
export class LoadingComponent {
  size = input<LoadingSize>('md');
  variant = input<LoadingVariant>('spinner');
  text = input<string>();
  color = input<string>('emerald');

  protected getSpinnerClasses(): string {
    const sizeClasses = this.getSpinnerSizeClasses();
    const colorClasses = this.getColorClasses();
    
    return `animate-spin rounded-full border-2 border-t-transparent ${sizeClasses} ${colorClasses}`;
  }

  protected getPulseClasses(): string {
    const sizeClasses = this.getPulseSizeClasses();
    const colorClasses = this.getPulseColorClasses();
    
    return `animate-pulse rounded-full ${sizeClasses} ${colorClasses}`;
  }

  protected getBounceClasses(): string {
    const sizeClasses = this.getBounceSizeClasses();
    const colorClasses = this.getBounceColorClasses();
    
    return `animate-bounce rounded-full ${sizeClasses} ${colorClasses}`;
  }

  protected getTextClasses(): string {
    return 'mt-2 text-sm text-gray-600 dark:text-gray-400 text-center';
  }

  private getSpinnerSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  }

  private getPulseSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-12 h-12';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-20 h-20';
      default:
        return 'w-12 h-12';
    }
  }

  private getBounceSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'w-2 h-2';
      case 'md':
        return 'w-3 h-3';
      case 'lg':
        return 'w-4 h-4';
      case 'xl':
        return 'w-6 h-6';
      default:
        return 'w-3 h-3';
    }
  }

  private getColorClasses(): string {
    switch (this.color()) {
      case 'emerald':
        return 'border-emerald-500';
      case 'blue':
        return 'border-blue-500';
      case 'red':
        return 'border-red-500';
      case 'amber':
        return 'border-amber-500';
      case 'gray':
        return 'border-gray-500';
      default:
        return 'border-emerald-500';
    }
  }

  private getPulseColorClasses(): string {
    switch (this.color()) {
      case 'emerald':
        return 'bg-emerald-500';
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      case 'amber':
        return 'bg-amber-500';
      case 'gray':
        return 'bg-gray-500';
      default:
        return 'bg-emerald-500';
    }
  }

  private getBounceColorClasses(): string {
    switch (this.color()) {
      case 'emerald':
        return 'bg-emerald-500';
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      case 'amber':
        return 'bg-amber-500';
      case 'gray':
        return 'bg-gray-500';
      default:
        return 'bg-emerald-500';
    }
  }
}
