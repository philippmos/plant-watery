import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button 
      [class]="getButtonClasses()"
      [disabled]="disabled()"
      (click)="handleClick()"
      [type]="type()">
      @if (loading()) {
        <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
      }
      @if (iconLeft()) {
        <svg class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path [attr.d]="iconLeft()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      }
      <ng-content></ng-content>
      @if (iconRight()) {
        <svg class="w-4 h-4 ml-2 transition-transform duration-200 group-hover:scale-110" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path [attr.d]="iconRight()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      }
    </button>
  `
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  iconLeft = input<string>();
  iconRight = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  
  clicked = output<void>();

  protected handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }

  protected getButtonClasses(): string {
    const baseClasses = 'group inline-flex items-center justify-center font-semibold rounded-lg border backdrop-blur-sm transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();
    const widthClasses = this.fullWidth() ? 'w-full' : '';
    
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClasses}`;
  }

  private getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'px-3 py-2 text-xs';
      case 'md':
        return 'px-4 py-3 text-sm';
      case 'lg':
        return 'px-6 py-4 text-base';
      default:
        return 'px-4 py-3 text-sm';
    }
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'primary':
        return 'bg-gradient-to-r from-emerald-600 to-green-700 text-white border-emerald-500/20 hover:from-emerald-700 hover:to-green-800 focus:ring-emerald-400';
      case 'secondary':
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white border-green-500/20 hover:from-green-500 hover:to-green-600 focus:ring-green-400';
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400/20 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-300';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400/20 hover:from-amber-600 hover:to-orange-700 focus:ring-amber-300';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400/20 hover:from-red-600 hover:to-red-700 focus:ring-red-300';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400/20 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-300';
      case 'light':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300/50 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-400';
      case 'dark':
        return 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border-gray-600/20 hover:from-gray-800 hover:to-gray-900 focus:ring-gray-500';
      default:
        return 'bg-gradient-to-r from-emerald-600 to-green-700 text-white border-emerald-500/20 hover:from-emerald-700 hover:to-green-800 focus:ring-emerald-400';
    }
  }
}
