import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class JwtService {

  constructor(private jwtHelper: JwtHelperService) { }

  get getUserId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.id : null;
  }

  get getUsername(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
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
