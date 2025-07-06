import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/layout/navigation/navigation.component";
import { FooterComponent } from "./components/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent
],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected title = 'plant-watery';
}
