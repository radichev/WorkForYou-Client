import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserProfile } from '../shared/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isLoading = true;
  id: string;
  username: string;
  userProfile: UserProfile;

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = this.jwtService.getUsername;
    this.userService.getUserProfile(this.id).subscribe(data => {
      this.userProfile = data;
      this.isLoading = false;
    });
  }
}
