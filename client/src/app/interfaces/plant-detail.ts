export interface PlantDetail {
    id: string;
    title: string;
    imageUrl: string;
    locationName: string;
    wateringIntervalInDays?: number;
    wateringEvents: {
        id: string;
        dateTime: Date;
        comment?: string | null;
    }[];
}