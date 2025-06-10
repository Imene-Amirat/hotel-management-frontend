import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { HomeComponent } from './features/home/home.component';
import { RoomDetailsComponent } from './features/room-details/room-details.component';
import { RoomsComponent } from './features/rooms/rooms.component';
import { ReservationConfirmComponent } from './features/reservation-confirm/reservation-confirm.component';
import { ReservationPaymentComponent } from './features/reservation-payment/reservation-payment.component';
import { MyReservationsComponent } from './features/my-reservations/my-reservations.component';
import { HotelFeaturesComponent } from './features/hotel-features/hotel-features.component';
import { FeatureDetailsComponent } from './features/feature-details/feature-details.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
    ...authRoutes,   //take everything inside authRoutes array and insert it here
    {path: '', component: HomeComponent}, //default route
    {path: 'rooms/:id', component: RoomDetailsComponent},
    {path: 'rooms', component: RoomsComponent}, 
    {path: 'reservation/confirm', component: ReservationConfirmComponent},
    {path: 'reservation/:id/payement', component: ReservationPaymentComponent},
    {path: 'reservations', component: MyReservationsComponent},
    {path: 'features', component: HotelFeaturesComponent},
    {path: 'features/:id', component: FeatureDetailsComponent},
    {path: 'about', component: AboutComponent}
];
