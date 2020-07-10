import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserProfile } from '../shared/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isLoading = true;
  id: string;
  username: string;
  userProfile: UserProfile;
  photo: any
  selectedImage: File;
  userProfileSubscription: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService, private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = this.jwtService.getUsername;

    this.userProfileSubscription = this.userService.getUserProfile(this.id).subscribe(data => {
      this.userProfile = data;
      this.isLoading = false;
    });

    this.photo = `http://localhost:8080/api/profile/details/${this.id}/image/download`;

    // this.userService.getUserProfileImage(this.id).subscribe(data => {
    //   const reader = new FileReader();
    //   reader.onload = (e) => this.photo = "data:Image/*;base64,"+e.target.result;
    //   reader.readAsDataURL(new Blob([data]));

    // this.photo = this.sanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+data)
    // });
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];

    const formData = new FormData;
    formData.append('file', this.selectedImage, this.selectedImage.name);

    this.userService.uploadUserProfileImage(this.id, formData).subscribe(res => {
      console.log(res);
    });
  }
}
