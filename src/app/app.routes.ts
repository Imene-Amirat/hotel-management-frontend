import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
  ...authRoutes,   //take everything inside authRoutes array and insert it here
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'rooms/:id',
        loadComponent: () => import('./features/room-details/room-details.component').then(m => m.RoomDetailsComponent)
      },
      {
        path: 'rooms',
        loadComponent: () => import('./features/rooms/rooms.component').then(m => m.RoomsComponent)
      },
      {
        path: 'reservation/confirm',
        loadComponent: () => import('./features/reservation-confirm/reservation-confirm.component').then(m => m.ReservationConfirmComponent)
      },
      {
        path: 'reservation/:id/payement',
        loadComponent: () => import('./features/reservation-payment/reservation-payment.component').then(m => m.ReservationPaymentComponent)
      },
      {
        path: 'reservations',
        loadComponent: () => import('./features/my-reservations/my-reservations.component').then(m => m.MyReservationsComponent)
      },
      {
        path: 'features',
        loadComponent: () => import('./features/hotel-features/hotel-features.component').then(m => m.HotelFeaturesComponent)
      },
      {
        path: 'features/:id',
        loadComponent: () => import('./features/feature-details/feature-details.component').then(m => m.FeatureDetailsComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
      }
    ]
  },
  {
    path:'',
    component: AdminLayoutComponent
  }
];
