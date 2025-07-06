import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/layout/navigation/navigation.component";
import { PageHeaderComponent } from "./components/layout/page-header/page-header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent,
    PageHeaderComponent,
    FooterComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected title = 'plant-watery';
}
