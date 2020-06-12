import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    }
    return this.authService.isLoggedIn();
  }
  
}
