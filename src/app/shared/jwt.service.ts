import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class JwtService {

  private readonly JWT_TOKEN = localStorage.getItem('JWT_TOKEN')

  private decodedToken = this.jwtHelper.decodeToken(this.JWT_TOKEN);

  constructor(private jwtHelper: JwtHelperService) { }

  getUserId() {
    return this.decodedToken.id;
  }

  getUsername() {
    return this.decodedToken.sub;
  }
}
