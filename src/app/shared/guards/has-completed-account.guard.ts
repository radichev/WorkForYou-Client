import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HasCompletedAccountGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) { }

  canActivate() {
    const hasCompletedAccountSetup: boolean = this.jwtService.getHasCompletedAccountSetup;

    if (!hasCompletedAccountSetup) {
      this.router.navigate(['/users/profile/edit', this.jwtService.getUserId]);
    }
    return hasCompletedAccountSetup;
  }

}
