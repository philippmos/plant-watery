import { PlantLocation } from "./plant-location";

export interface Plant {
  id: string;
  imageUrl: string;
  lastWateredDate: Date;
  title: string;
  location: PlantLocation;
}
