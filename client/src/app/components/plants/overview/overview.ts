import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { OverviewItem } from '../overview-item/overview-item';
import { LoginPrompt } from '../../layout/login-prompt/login-prompt';
import { PlantService } from '../../../services/plant.service';
import { PlantOverview } from '../../../interfaces/plant-overview';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewItem, LoginPrompt, CommonModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss']
})
export class Overview implements OnInit {
  private plantService = inject(PlantService);
  private authService = inject(AuthService);
  
  protected readonly items = this.plantService.plants;
  protected readonly isLoading = this.plantService.isLoading;
  protected readonly isAuthenticated = this.authService.isAuthenticated$;

  async ngOnInit() {
    const isAuthenticated = await firstValueFrom(this.authService.isAuthenticated$);
    
    if (isAuthenticated) {
      await this.plantService.getAllPlants();
    }
  }

  trackById(index: number, item: PlantOverview) {
    return item.id;
  }
}
