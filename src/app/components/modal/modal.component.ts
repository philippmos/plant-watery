import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plant } from '../../interfaces/plant';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() data!: Plant;
    @Output() modalClose = new EventEmitter<void>();

    comment = '';

    onSave() {
        const newHistoryItem = {
            id: crypto.randomUUID(),
            dateTime: new Date(),
            comment: this.comment
        };

        this.data.waterHistory.push(newHistoryItem);
        this.modalClose.emit();
    }

    onClose() {
        this.modalClose.emit();
    }
}
