import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfile } from '../shared/models/user-profile';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupTables } from '../shared/models/lookup-tables';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit, OnDestroy {

  userProfile: UserProfile;
  id: string;
  isLoading = true;
  photo: any;
  selectedImage: File;
  lookupTables: LookupTables;
  descriptionForm: FormGroup;
  languageForm: FormGroup;
  skillForm: FormGroup;
  educationsForm: FormGroup;
  certificateForm: FormGroup;
  basicInfo: FormGroup;
  userProfileSubscription: Subscription;
  lookupTablesSubscription: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }

    if (this.lookupTablesSubscription) {
      this.lookupTablesSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.userProfileSubscription = this.userService.getUserProfile(this.id).subscribe(data => {
      this.userProfile = data;

      if (!this.userProfile.profilePicture) {
        this.photo = `https://simpleicon.com/wp-content/uploads/user1.png`;
      } else if (this.userProfile.profilePicture) {
        this.photo = this.userProfile.profilePicture;
      }
    });

    this.lookupTablesSubscription = this.userService.getAllLookupTables().subscribe(data => {
      this.lookupTables = data;
      this.isLoading = false;
    });


    this.descriptionForm = this.formBuilder.group({
      description: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(800)]],
    });

    this.languageForm = this.formBuilder.group({
      language: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      languageLevel: [null, [Validators.required]]
    });

    this.skillForm = this.formBuilder.group({
      skill: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      skillLevel: [null, [Validators.required]]
    });

    this.educationsForm = this.formBuilder.group({
      country: [null, [Validators.required]],
      universityName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      titleType: [null, [Validators.required]],
      educationSubject: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      graduationYear: [null, [Validators.required, Validators.min(1915), Validators.max(2050)]]
    });

    this.certificateForm = this.formBuilder.group({
      certificateSubject: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      awardedFrom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      graduationYear: [null, [Validators.required, Validators.min(1915), Validators.max(2050)]]
    });

    this.basicInfo = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      personalWebsite: [null, [Validators.minLength(4), Validators.maxLength(30)]],
      country: [null, [Validators.required]]
    });

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.basicInfo.controls[controlName].hasError(errorName);
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];

    const formData = new FormData;
    formData.append('file', this.selectedImage, this.selectedImage.name);

    this.userService.uploadUserProfileImage(this.id, formData).subscribe(() => {
      this.ngOnInit();
    });
  }

  editDescription() {
    const formValue = this.descriptionForm.value;
    this.userProfile.description = formValue.description;
    this.userService.editUserProfile(this.id, this.userProfile).subscribe(() => {
      this.ngOnInit();
    });
  }

  addLanguages() {
    const formValue = this.languageForm.value;
    const languageLevel = {
      id: formValue.languageLevel
    }
    const language = {
      language: formValue.language,
      languageLevel: languageLevel
    };
    this.userService.addLanguage(this.id, language).subscribe(() => {
      this.ngOnInit();
    });
  }

  addSkill() {
    const formValue = this.skillForm.value;
    const skillLevel = {
      id: formValue.skillLevel
    }
    const skill = {
      skill: formValue.skill,
      skillLevel: skillLevel
    };
    this.userService.addSkill(this.id, skill).subscribe(() => {
      this.ngOnInit();
    });
  }

  addEducation() {
    const formValue = this.educationsForm.value;
    const country = {
      id: formValue.country
    };

    const titleType = {
      id: formValue.titleType
    };

    const education = {
      country: country,
      universityName: formValue.universityName,
      titleType: titleType,
      educationSubject: formValue.educationSubject,
      graduationYear: formValue.graduationYear
    };

    this.userService.addEducation(this.id, education).subscribe(() => {
      this.ngOnInit();
    });

  }

  addCertificate() {
    const formValue = this.certificateForm.value;
    const certificate = {
      certificateSubject: formValue.certificateSubject,
      awardedFrom: formValue.awardedFrom,
      graduationYear: formValue.graduationYear
    };
    this.userService.addCertificate(this.id, certificate).subscribe(() => {
      this.ngOnInit();
    });
  }

  editBasicInfo() {
    const formValue = this.basicInfo.value;
    this.userProfile.firstName = formValue.firstName;
    this.userProfile.lastName = formValue.lastName;
    this.userProfile.personalWebsite = formValue.personalWebsite;

    const country = {
      id: formValue.country,
      country: null
    }
    this.userProfile.country = country;

    this.userService.editUserProfile(this.id, this.userProfile).subscribe(() => {
      this.router.navigate(['/users/profile', this.userProfile.userId]);
    });
  }
}

