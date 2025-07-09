import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconType } from '../ui';

export interface PageHeaderConfig {
  title: string;
  subtitle: string;
  icon: IconType;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  config = input.required<PageHeaderConfig>();
}
