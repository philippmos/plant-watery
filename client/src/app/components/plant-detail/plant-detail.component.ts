import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { DatePipe } from '@angular/common';
import { Plant } from '../../interfaces/plant';

@Component({
  selector: 'app-plant-detail',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent {
  private route = inject(ActivatedRoute);
  private overviewService = inject(PlantService);

  plant: Plant | undefined;

  constructor() {
    const plantId = this.route.snapshot.paramMap.get('id');
    console.log('Plant ID:', plantId);
    this.plant = this.overviewService.getPlantById(plantId!);
  }
}
