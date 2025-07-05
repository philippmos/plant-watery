import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlantOverview } from '../../interfaces/plant-overview';
import { PlantService } from '../../services/plant.service';

@Component({
    selector: 'app-watering-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './watering-modal.component.html',
    styleUrls: ['./watering-modal.component.scss']
})
export class WateringModalComponent {
    @Input() isOpen = false;
    @Input() data!: PlantOverview;
    @Output() modalClose = new EventEmitter<void>();

    private readonly plantService = inject(PlantService);

    comment = '';

    async onSave() {

        await this.plantService.addWatering(this.data.id, { comment: this.comment });

        this.modalClose.emit();
    }

    onClose() {
        this.modalClose.emit();
    }
}
