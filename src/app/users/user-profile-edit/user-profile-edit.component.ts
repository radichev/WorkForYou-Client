import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../shared/models/user-profile';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupTables } from '../shared/models/lookup-tables';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  userProfile: UserProfile;
  id: string;
  username: string;
  isLoading = true;
  isLookupLoaded = true;
  photo: any;
  lookupTables: LookupTables;
  descriptionForm: FormGroup;
  languageForm: FormGroup;
  skillForm: FormGroup;
  educationsForm: FormGroup;
  certificateForm: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = this.jwtService.getUsername;
    this.userService.getUserProfile(this.id).subscribe(data => {
      this.userProfile = data;
      this.isLoading = false;
    });

    this.photo = `http://localhost:8080/api/profile/details/${this.id}/image/download`;

    this.userService.getAllLookupTables().subscribe(data => {
      this.lookupTables = data;
      this.isLookupLoaded = false;
    });

    this.descriptionForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });

    this.languageForm = this.formBuilder.group({
      language: [null, [Validators.required]],
      languageLevel: [null, [Validators.required]]
    });

    this.skillForm = this.formBuilder.group({
      skill: [null, [Validators.required]],
      skillLevel: [null, [Validators.required]]
    });

    this.educationsForm = this.formBuilder.group({
      country: [null, [Validators.required]],
      collegeName: [null, [Validators.required]],
      titleType: [null, [Validators.required]],
      major: [null, [Validators.required]],
      graduationYear: [null, [Validators.required]]
    });

    this.certificateForm = this.formBuilder.group({
      certificate: [null, [Validators.required]],
      awardedFrom: [null, [Validators.required]],
      graduationYear: [null, [Validators.required]]
    });
  }

  editDescription() {

  }

  addLanguages() {

  }

  addSkill() {

  }

  addEducation() {

  }

  addCertificate() {

  }


}

