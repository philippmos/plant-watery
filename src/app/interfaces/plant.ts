import { WaterHistoryItem } from './water-history-item';

export interface Plant {
    id: string;
    imageUrl: string;
    title: string;
    locationId: string;
    locationName?: string; // TODO: Split proper Dto
    waterHistory: WaterHistoryItem[];
}
