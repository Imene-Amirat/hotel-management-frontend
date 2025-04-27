import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe({
      next: (res) => {
        console.log('User is authenticated:', res.loggedIn);
        this.authService.loggedIn = res.loggedIn;
      },
      error: (err) => {
        this.authService.loggedIn = false;
        console.error('Error checking authentication:', err);
      }
    });
  }

  logout() {  
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        
        this.authService.loggedIn = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }
}
