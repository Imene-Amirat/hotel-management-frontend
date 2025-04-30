import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {}

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]*$/)]
    ]
  });

  register(){
    if (this.registerForm.invalid){
      console.log('Invalid form');
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const username = this.registerForm.get('username')?.value || '';
    const email = this.registerForm.get('email')?.value || '';
    const password = this.registerForm.get('password')?.value || '';

    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
        });
        
        this.authService.loggedIn = true;
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
        });
        this.registerForm.reset(); 
        this.registerForm.markAsUntouched(); 
      }
    });
  }
}
