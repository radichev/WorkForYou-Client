import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId: string;
  username: string;

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtService) { }

  ngOnInit(): void {}

  getUserDetails() {
    this.userId = this.jwtHelper.getUserId;
    this.username = this.jwtHelper.getUsername;
  }

  isLoggedIn() {
    this.getUserDetails();
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
