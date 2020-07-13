import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfile } from './models/user-profile';
import { LookupTables } from './models/lookup-tables';

@Injectable()
export class UserService {

  private readonly PROFILE_DETAILS_URL = `${environment.apiUrl}/profile/details/`
  private readonly LOOKUP_TABLES_URL = `${environment.apiUrl}/profile/details/lookups`
  private readonly ADD_LANGUAGE_URL = `${environment.apiUrl}/languages/add/`;
  private readonly ADD_SKILL_URL = `${environment.apiUrl}/skills/add/`;
  private readonly ADD_EDUCATION_URL = `${environment.apiUrl}/educations/add/`;
  private readonly ADD_CERTIFICATE_URL = `${environment.apiUrl}/certificates/add/`;

  constructor(private http: HttpClient) { }

  getUserProfile(id: string) {
    return this.http.get<UserProfile>(`${this.PROFILE_DETAILS_URL}${id}`);
  }

  editUserProfile(id: string, userProfile: UserProfile) {
    return this.http.post<UserProfile>(this.PROFILE_DETAILS_URL + id, userProfile);
  }

  addLanguage(id: string, language: Object) {
    return this.http.post(this.ADD_LANGUAGE_URL + id, language);
  }

  addSkill(id: string, skill: Object) {
    return this.http.post(this.ADD_SKILL_URL + id, skill)
  }

 addEducation(id: string, education: Object){
    return this.http.post(this.ADD_EDUCATION_URL + id, education);
 }

 addCertificate(id: string, certificate: Object) {
   return this.http.post(this.ADD_CERTIFICATE_URL + id, certificate);
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
