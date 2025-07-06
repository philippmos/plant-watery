import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlantOverview } from '../../../interfaces/plant-overview';
import { PlantService } from '../../../services/plant.service';

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
    
    protected readonly isSaving = signal(false);

    comment = '';
    selectedDate = '';
    selectedTime = '';

    constructor() {
        const now = new Date();
        this.selectedDate = now.toISOString().split('T')[0];
        this.selectedTime = now.toTimeString().slice(0, 5);
    }

    async onSave() {
        if (this.isSaving()) {
            return;
        }

        this.isSaving.set(true);
        
        try {
            const dateTime = new Date(`${this.selectedDate}T${this.selectedTime}`);
            
            await this.plantService.addWatering(this.data.id, { 
                comment: this.comment.trim() || undefined,
                dateTime: dateTime.toISOString()
            });

            this.onClose();
        } catch (error) {
            console.error('Error saving watering:', error);
        } finally {
            this.isSaving.set(false);
        }
    }

    onClose() {
        this.comment = '';
        const now = new Date();
        this.selectedDate = now.toISOString().split('T')[0];
        this.selectedTime = now.toTimeString().slice(0, 5);
        
        this.modalClose.emit();
    }
}
