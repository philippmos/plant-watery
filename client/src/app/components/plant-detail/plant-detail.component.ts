import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  imports: [DatePipe, AsyncPipe],
  standalone: true,
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent {
  private route = inject(ActivatedRoute);
  private plantService = inject(PlantService);

  protected readonly plant = computed(() => this.plantService.getPlantById(this.route.snapshot.paramMap.get('id')!));
}
