import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { HomeComponent } from './features/home/home.component';
import { RoomDetailsComponent } from './features/room-details/room-details.component';

export const routes: Routes = [
    ...authRoutes,   //take everything inside authRoutes array and insert it here
    {path: '', component: HomeComponent}, //default route
    {path: 'detailsRoom/:id', component: RoomDetailsComponent}
];
