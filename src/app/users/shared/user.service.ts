import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/shared/jwt.service';
import { UserProfile } from './models/user-profile';

@Injectable()
export class UserService {

  private readonly PROFILE_DETAILS_ULR = `${environment.apiUrl}/profile/details/`

  constructor(private http: HttpClient, private jwtService: JwtService) { }
  
  getUser() {
    const userId = this.jwtService.getUserId();
    return this.http.get<UserProfile>(this.PROFILE_DETAILS_ULR + userId);    
  }
}
