import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  private readonly LOGIN_URL = `${environment.apiUrl}/profile/details`

  constructor(private http: HttpClient) { }
  
  getUser() {    
  }
}
