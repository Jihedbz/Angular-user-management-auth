import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatus$.subscribe((status: boolean) => {
      this.isLoggedIn = status; // ✅ Explicitly define 'status' as boolean
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
