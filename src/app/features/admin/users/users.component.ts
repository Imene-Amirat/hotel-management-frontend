import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log('Users:', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
