import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    ...authRoutes,   //take everything inside authRoutes array and insert it here
];
