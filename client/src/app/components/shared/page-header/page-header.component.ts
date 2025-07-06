import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PageHeaderConfig {
  title: string;
  subtitle: string;
  icon: string;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  config = input.required<PageHeaderConfig>();
}
