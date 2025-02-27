import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      token => {
        this.authService.saveToken(token);
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error => {
        alert('Login failed! Check your credentials.');
      }
    );
  }
}
