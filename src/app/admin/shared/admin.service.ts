import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfileAdminModel } from './userProfileAdminModel';
import { RoleAdminModel } from './roleAdminModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly GET_ALL_USERS = `${environment.apiUrl}/admin/users`
  private readonly GET_ALL_ROLES = `${environment.apiUrl}/admin/roles`
  private readonly CHANGE_ROLE_URL = `${environment.apiUrl}/admin/change-role`

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UserProfileAdminModel[]>(this.GET_ALL_USERS);
  }

  getAllRoles() {
    return this.http.get<RoleAdminModel[]>(this.GET_ALL_ROLES);
  }

  changeRole(changeRoleModel: Object) {
    return this.http.post(this.CHANGE_ROLE_URL, changeRoleModel)
  }
}
