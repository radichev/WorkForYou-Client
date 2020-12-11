import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate() {
    const isAdmin = this.jwtService.isAdmin();

    if(!isAdmin) {
      this.router.navigate(['/']);
    }

    return this.jwtService.isAdmin();
  }
  
}
