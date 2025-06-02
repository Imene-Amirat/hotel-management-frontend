export interface Reservation {
    id: number;
    guestFirstName: string;
    guestLastName: string;
    guestPhone: string;
    status: string;
    checkIn: string;
    nbNights: number;
    roomType: string;      
    checkOut: string;
    totalPrice: number;
    roomNumber: number;
}