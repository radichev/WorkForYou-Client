import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserProfile } from '../shared/models/user-profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: string;
  userProfile: UserProfile;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile(this.id).subscribe(data => { this.userProfile = data });
  }
}
