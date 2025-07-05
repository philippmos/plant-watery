import { Component, OnInit, inject } from '@angular/core';
import { OverviewItem } from '../overview-item/overview-item';
import { PlantService } from '../../services/plant.service';
import { PlantOverview } from '../../interfaces/plant-overview';
import { AuthService } from '@auth0/auth0-angular';
import { LoginPrompt } from '../login-prompt/login-prompt';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

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
