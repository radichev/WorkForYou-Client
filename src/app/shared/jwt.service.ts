import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly ADMIN_AUTHORITY = "ADMIN";

  constructor(private jwtHelper: JwtHelperService) { }

  get getUserId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.id : null;
  }

  get getUsername(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  }

  get getAuthority(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.authorities.split(/\[([^\][]*)]/)[1] : null;
  
  }

  isAdmin(): boolean {
    return this.getAuthority == this.ADMIN_AUTHORITY;
  }

  private getDecodedToken(): any {
    const token = this.jwtHelper.tokenGetter();
    let decodedToken = null;

    if (token) {
      decodedToken = this.jwtHelper.decodeToken(token);
    }

    return decodedToken;
  }
}
