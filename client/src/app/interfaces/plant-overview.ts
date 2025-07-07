export interface PlantOverview {
    id: string;
    imageUrl: string;
    title: string;
    locationName: string;
    lastWateredDateTime?: Date;
    wateringIntervalInDays?: number;
}
