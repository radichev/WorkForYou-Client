import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfile } from './models/user-profile';
import { LookupTables } from './models/lookup-tables';

@Injectable()
export class UserService {

  private readonly PROFILE_DETAILS_URL = `${environment.apiUrl}/profile/details/`
  private readonly LOOKUP_TABLES_URL = `${environment.apiUrl}/profile/details/lookups`

  constructor(private http: HttpClient) { }

  getUserProfile(id: string) {
    return this.http.get<UserProfile>(`${this.PROFILE_DETAILS_URL}${id}`);
  }

  editUserProfile(id: string, userProfile: UserProfile) {
    return this.http.post<UserProfile>(this.PROFILE_DETAILS_URL + id, userProfile);
  }

  

  getAllLookupTables() {
    return this.http.get<LookupTables>(this.LOOKUP_TABLES_URL);
  }

  // getUserProfileImage(id:string) {
  //   // const userId = this.jwtService.getUserId;
  //   // this.IMAGE_URL = this.sanitizeImageUrl(this.PROFILE_DETAILS_ULR + `${id}/image/download`);
  //   return this.http.get(`http://localhost:8080/api/profile/details/${id}/image/download`, { responseType: 'blob' });
  // }

  uploadUserProfileImage(id: string, formData: FormData) {
    return this.http.post(`http://localhost:8080/api/profile/details/${id}/image/upload`, formData);
  }
}
