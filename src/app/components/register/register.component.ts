import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'USER'; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password, this.role).subscribe(
      () => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed!');
      }
    );
  }
}
