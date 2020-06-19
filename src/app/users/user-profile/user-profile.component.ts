import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserProfile } from '../shared/models/user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(data => { this.userProfile = data });
  }
}
