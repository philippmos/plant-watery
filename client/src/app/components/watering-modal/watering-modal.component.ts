import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlantOverview } from '../../interfaces/plant-overview';

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

    comment = '';

    onSave() {
        this.modalClose.emit();
    }

    onClose() {
        this.modalClose.emit();
    }
}
