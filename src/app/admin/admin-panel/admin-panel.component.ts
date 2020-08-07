import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { UserProfileAdminModel } from '../shared/userProfileAdminModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleAdminModel } from '../shared/roleAdminModel';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: UserProfileAdminModel[];
  authorities: RoleAdminModel[];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'authority', 'updateColumn'];
  authorityForm: FormGroup;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.adminService.getAllRoles().subscribe(data => {
      this.authorities = data;
    })
    
    this.authorityForm = this.formBuilder.group({
      authority: [null, [Validators.required]],
    });
  }

  updateAuthority(username: string) {
    const changeRoleModel = {
      username: username,
      authority: this.authorityForm.get('authority').value
    }

    this.adminService.changeRole(changeRoleModel).subscribe(() => {
      this.ngOnInit();
    });
  }

}
