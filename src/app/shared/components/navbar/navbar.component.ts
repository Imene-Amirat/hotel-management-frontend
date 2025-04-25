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

  loggedIn: boolean = false;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe({
      next: (res) => {
        this.loggedIn = res.loggedIn;
        console.log('User is authenticated:', this.loggedIn);
      },
      error: (err) => {
        this.loggedIn = false;
        console.error('Error checking authentication:', err);
      }
    });
  }

  logout() {  
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
