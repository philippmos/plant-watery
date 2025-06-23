import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plant } from '../../interfaces/plant';
import { WateringModalComponent } from '../watering-modal/watering-modal.component';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-overview-item',
    standalone: true,
    imports: [RouterLink, WateringModalComponent, AsyncPipe],
    templateUrl: './overview-item.html',
    styleUrls: ['./overview-item.scss']
})
export class OverviewItem {
    protected auth: AuthService = inject(AuthService);

    @Input() data!: Plant;

    isModalOpen = false;

    get plantLink(): string {
        return `/plants/${this.data.id}`;
    }

    get lastWatered(): string {
        if (this.data.waterHistory.length === 0) {
            return 'Nie gegossen';
        }

        const lastItem = this.data.waterHistory
            .slice()
            .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())[0];

        return lastItem.dateTime.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
