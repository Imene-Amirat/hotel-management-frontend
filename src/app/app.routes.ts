import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { HomeComponent } from './features/home/home.component';
import { RoomDetailsComponent } from './features/room-details/room-details.component';
import { RoomsComponent } from './features/rooms/rooms.component';
import { ReservationConfirmComponent } from './features/reservation-confirm/reservation-confirm.component';
import { ReservationPayementComponent } from './features/reservation-payement/reservation-payement.component';

export const routes: Routes = [
    ...authRoutes,   //take everything inside authRoutes array and insert it here
    {path: '', component: HomeComponent}, //default route
    {path: 'rooms/:id', component: RoomDetailsComponent},
    {path: 'rooms', component: RoomsComponent}, 
    {path: 'reservation/confirm', component: ReservationConfirmComponent},
    {path: 'reservation/payement', component: ReservationPayementComponent}
];
