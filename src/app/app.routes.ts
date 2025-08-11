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
        loadComponent: () => import('./features/user/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'rooms/:id',
        loadComponent: () => import('./features/user/room-details/room-details.component').then(m => m.RoomDetailsComponent)
      },
      {
        path: 'rooms',
        loadComponent: () => import('./features/user/rooms/rooms.component').then(m => m.RoomsComponent)
      },
      {
        path: 'reservation/confirm',
        loadComponent: () => import('./features/user/reservation-confirm/reservation-confirm.component').then(m => m.ReservationConfirmComponent)
      },
      {
        path: 'reservation/:id/payement',
        loadComponent: () => import('./features/user/reservation-payment/reservation-payment.component').then(m => m.ReservationPaymentComponent)
      },
      {
        path: 'reservations',
        loadComponent: () => import('./features/user/my-reservations/my-reservations.component').then(m => m.MyReservationsComponent)
      },
      {
        path: 'features',
        loadComponent: () => import('./features/user/hotel-features/hotel-features.component').then(m => m.HotelFeaturesComponent)
      },
      {
        path: 'features/:id',
        loadComponent: () => import('./features/user/feature-details/feature-details.component').then(m => m.FeatureDetailsComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/user/about/about.component').then(m => m.AboutComponent)
      }
    ]
  },
  {
    path:'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashborad/dashborad.component').then(m => m.DashboradComponent)
      },
      {
        path: 'rooms',
        loadComponent: () => import('./features/admin/rooms/rooms.component').then(m => m.RoomsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent)
      }
    ]
  }
];
