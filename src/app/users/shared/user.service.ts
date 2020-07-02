import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/shared/jwt.service';
import { UserProfile } from './models/user-profile';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private readonly PROFILE_DETAILS_ULR = `${environment.apiUrl}/profile/details/`
  private IMAGE_UR;

  constructor(private http: HttpClient, private jwtService: JwtService, private sanitizer: DomSanitizer) { }
  
  getUserProfile(id) {
    const userId = this.jwtService.getUserId;
    return this.http.get<UserProfile>(this.PROFILE_DETAILS_ULR + id);    
  }

  getUserProfileImage(id){
    // const userId = this.jwtService.getUserId;
    // this.IMAGE_URL = this.sanitizeImageUrl(this.PROFILE_DETAILS_ULR + `${id}/image/download`);
    return this.http.get(`http://localhost:8080/api/profile/details/${id}/image/download`, {responseType: 'blob'});
  }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
}
