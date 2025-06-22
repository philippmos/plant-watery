import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./layout/navigation/navigation";
import { PageHeader } from './layout/page-header/page-header';
import { Overview } from './components/overview/overview';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    PageHeader,
    Overview
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'plant-watery';
}
