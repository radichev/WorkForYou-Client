import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../shared/models/user-profile';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/shared/jwt.service';
import { LanguageLevel } from '../shared/models/language-models/language-level';
import { SkillLevel } from '../shared/models/skill-models/skill-level';
import { FormGroup } from '@angular/forms';
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

  constructor(private userService: UserService, private route: ActivatedRoute, private jwtService: JwtService) { }

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
    })
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

