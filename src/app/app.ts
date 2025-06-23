import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/layout/navigation/navigation";
import { PageHeader } from "./components/layout/page-header/page-header";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    PageHeader
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'plant-watery';
}
