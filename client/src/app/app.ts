import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/layout/navigation/navigation";
import { PageHeader } from "./components/layout/page-header/page-header";
import { FooterComponent } from "./components/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    PageHeader,
    FooterComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'plant-watery';
}
