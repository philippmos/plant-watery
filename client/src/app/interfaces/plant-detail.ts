export interface PlantDetail {
    id: string;
    title: string;
    imageUrl: string;
    locationName: string;
    wateringEvents: {
        id: string;
        dateTime: Date;
        comment?: string | null;
    }[];
}