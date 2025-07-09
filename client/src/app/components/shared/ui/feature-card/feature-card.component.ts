import { Component, input } from '@angular/core';
import { CardComponent, CardVariant } from '../card/card.component';
import { IconContainerComponent, IconContainerVariant } from '../icon-container/icon-container.component';
import { IconType } from '../icon/icon.component';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CardComponent, IconContainerComponent],
  template: `
    <app-card 
      [variant]="variant()" 
      [padding]="'lg'" 
      [hoverable]="hoverable()"
      [shadow]="'xl'">
      
      <div class="relative">
        <!-- Decorative Elements -->
        @if (decorative()) {
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12 pointer-events-none"></div>
        }
        
        <div class="relative">
          <!-- Header -->
          <div class="flex items-center space-x-4 mb-6">
            @if (icon()) {
              <app-icon-container 
                [icon]="icon()!" 
                [variant]="iconVariant()" 
                [size]="iconSize()"
                [rounded]="'xl'">
              </app-icon-container>
            }
            
            <div class="space-y-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {{ title() }}
              </h3>
              @if (subtitle()) {
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ subtitle() }}
                </p>
              }
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-4">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </app-card>
  `
})
export class FeatureCardComponent {
  title = input.required<string>();
  subtitle = input<string>();
  icon = input<IconType>();
  variant = input<CardVariant>('default');
  iconVariant = input<IconContainerVariant>('emerald');
  iconSize = input<'sm' | 'md' | 'lg' | 'xl'>('lg');
  hoverable = input<boolean>(true);
  decorative = input<boolean>(true);
}
