import { PlantLocation } from "./plant-location";
import { WaterHistoryItem } from "./water-history-item";

export interface Plant {
    id: string;
    imageUrl: string;
    title: string;
    location: PlantLocation;
    waterHistory: WaterHistoryItem[];
}
