import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plant } from '../../interfaces/plant';

@Component({
    selector: 'app-overview-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './overview-item.html',
    styleUrls: ['./overview-item.scss']
})
export class OverviewItem {
    @Input() data!: Plant;

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

    updateLastWatered() {
        this.data.waterHistory.push({
            id: (Math.random() * 1000000).toString(),
            dateTime: new Date(),
            comment: 'Gut gegossen'
        });
    }
}
