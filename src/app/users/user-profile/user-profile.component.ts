import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserProfile } from '../shared/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';
import { Subscription } from 'rxjs';
import { JobInputModel } from 'src/app/shared/models/input-models/job';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isLoading = true;
  id: string;
  userProfile: UserProfile;
  photo: any
  selectedImage: File;
  userProfileSubscription: Subscription;
  jobs: JobInputModel[];

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService) { }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.userProfileSubscription = this.userService.getUserProfile(this.id).subscribe(data => {
      this.userProfile = data;
      this.isLoading = false;
      if(!this.userProfile.profilePicture) {
        this.photo = `https://simpleicon.com/wp-content/uploads/user1.png`;
      } else {
        this.photo = `http://localhost:8080/api/profile/details/${this.id}/image/download`;
      }
    });


    this.userService.getAllJobs(this.id).subscribe(data => {
      this.jobs = data;
    });
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];

    const formData = new FormData;
    formData.append('file', this.selectedImage, this.selectedImage.name);

    this.userService.uploadUserProfileImage(this.id, formData).subscribe(() => {
      this.ngOnInit();
    });
  }
}
