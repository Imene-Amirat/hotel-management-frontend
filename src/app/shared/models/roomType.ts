export interface RoomType {
    id: number;
    type: string;
    description: string;
    capacityAdults: number;
    capacityChildren: number;
    pricePerNight: number;
    imageUrl: string;
    hasWifi: boolean;
    hasAirConditioning: boolean;
    hasTv: boolean;
    hasBreakfastIncluded: boolean;
    roomSize: number;
    bedType: string;
    hasBalcony: boolean;
    hasTerrace: boolean;
    hasKitchen: boolean;
    available: boolean;
}