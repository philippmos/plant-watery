import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-watering-interval',
  imports: [JsonPipe],
  standalone: true,
  templateUrl: './watering-interval.component.html'
})
export class WateringIntervalComponent {
  wateringIntervalInDays = input<number | null | undefined>(); 
  plantData = input<Record<string, unknown>>();
  showDebug = input<boolean>(false);
}
