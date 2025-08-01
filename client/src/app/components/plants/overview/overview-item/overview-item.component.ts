import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { WateringModalComponent } from '../../../shared/watering-modal/watering-modal.component';
import { PlantOverview } from '../../../../interfaces/plant-overview';
import { DateUtils } from '../../../../utils/date.utils';
import { CardComponent, ButtonComponent, BadgeComponent } from '../../../shared/ui';

@Component({
    selector: 'app-overview-item',
    standalone: true,
    imports: [RouterLink, WateringModalComponent, CardComponent, ButtonComponent, BadgeComponent],
    templateUrl: './overview-item.component.html'
})
export class OverviewItemComponent {
    protected auth: AuthService = inject(AuthService);
    protected readonly DateUtils = DateUtils;

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
