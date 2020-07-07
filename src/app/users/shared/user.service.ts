import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/shared/jwt.service';
import { UserProfile } from './models/user-profile';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { LanguageLevel } from './models/language-models/language-level';

@Injectable()
export class UserService {

  private readonly PROFILE_DETAILS_URL = `${environment.apiUrl}/profile/details/`
  private readonly LANGUAGE_LEVELS_URL = `${environment.apiUrl}/languages/levels/all`;
  private IMAGE_UR;

  constructor(private http: HttpClient, private jwtService: JwtService, private sanitizer: DomSanitizer) { }

  getUserProfile(id) {
    return this.http.get<UserProfile>(this.PROFILE_DETAILS_URL + id);
  }

  getLanguageLevels() {
    return this.http.get<LanguageLevel[]>(this.LANGUAGE_LEVELS_URL);
  }

  getUserProfileImage(id) {
    // const userId = this.jwtService.getUserId;
    // this.IMAGE_URL = this.sanitizeImageUrl(this.PROFILE_DETAILS_ULR + `${id}/image/download`);
    return this.http.get(`http://localhost:8080/api/profile/details/${id}/image/download`, { responseType: 'blob' });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  uploadUserProfileImage(id: string, formData: FormData) {
    return this.http.post(`http://localhost:8080/api/profile/details/${id}/image/upload`, formData);
  }
}
