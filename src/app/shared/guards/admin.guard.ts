import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  authority: string;
  private readonly ADMIN_AUTHORITY = "ADMIN";
  private readonly USER_AUTHORITY = "USER";
  
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate() {
    this.authority = this.jwtService.getAuthority;


    console.log(this.jwtService.getAuthority);

    if(this.authority == this.ADMIN_AUTHORITY) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
  
}
