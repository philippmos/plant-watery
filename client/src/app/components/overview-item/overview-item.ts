import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WateringModalComponent } from '../watering-modal/watering-modal.component';
import { AuthService } from '@auth0/auth0-angular';
import { DatePipe } from '@angular/common';
import { PlantOverview } from '../../interfaces/plant-overview';

@Component({
    selector: 'app-overview-item',
    standalone: true,
    imports: [RouterLink, WateringModalComponent, DatePipe],
    templateUrl: './overview-item.html',
    styleUrls: ['./overview-item.scss']
})
export class OverviewItem {
    protected auth: AuthService = inject(AuthService);

    @Input() data!: PlantOverview;

    isModalOpen = false;

    get plantLink(): string {
        return `/plants/${this.data.id}`;
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
