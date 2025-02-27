import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        this.router.navigate(['/login']).then(r => false);   // Redirect to login page
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
