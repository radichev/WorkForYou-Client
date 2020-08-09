import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfile } from '../shared/models/user-profile';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupTables } from '../shared/models/lookup-tables';
import { Subscription, forkJoin } from 'rxjs';

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
  forkedSubscription: Subscription;
  currDiv: string;
  fieldToEdit: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnDestroy(): void {
    if (this.forkedSubscription) {
      this.forkedSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.currDiv = "";
    this.id = this.route.snapshot.paramMap.get('id');

    var userProfile = this.userService.getUserProfile(this.id);
    var lookupTables = this.userService.getAllLookupTables();

    this.forkedSubscription = forkJoin(userProfile, lookupTables).subscribe(data => {
      this.userProfile = data[0];
      if (!this.userProfile.profilePicture) {
        this.photo = `https://simpleicon.com/wp-content/uploads/user1.png`;
      } else if (this.userProfile.profilePicture) {
        this.photo = this.userProfile.profilePicture;
      }
      this.lookupTables = data[1];
      this.isLoading = false;
    })

    this.basicInfo = this.formBuilder.group({
      firstName: [this.userProfile ? this.userProfile.firstName : null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastName: [this.userProfile ? this.userProfile.lastName : null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      personalWebsite: [this.userProfile ? this.userProfile.personalWebsite : null, [Validators.minLength(4), Validators.maxLength(30)]],
      country: [this.userProfile ? this.userProfile.country.id : null, [Validators.required]]
    });

    this.descriptionForm = this.formBuilder.group({
      description: [null, [Validators.minLength(15), Validators.maxLength(800)]],
    });
  }

  deleteItem(subjectCategory: string, id: string) {
    this.userService.deleteItem(subjectCategory, id).subscribe(() => {
      this.ngOnInit();
    });
  }

  addOrEditLanguageForm(item: any) {
    this.fieldToEdit = item;

    this.languageForm = this.formBuilder.group({
      language: [this.fieldToEdit ? this.fieldToEdit.language : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      languageLevel: [this.fieldToEdit ? this.fieldToEdit.languageLevel.id : null, [Validators.required]]
    });
  }

  addOrEditSkillsForm(item: any) {
    this.fieldToEdit = item;

    this.skillForm = this.formBuilder.group({
      skill: [this.fieldToEdit ? this.fieldToEdit.skill : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      skillLevel: [this.fieldToEdit ? this.fieldToEdit.skillLevel.id : null, [Validators.required]]
    });
  }

  addOrEditEducationForm(item: any) {
    this.fieldToEdit = item;

    this.educationsForm = this.formBuilder.group({
      country: [this.fieldToEdit ? this.fieldToEdit.country.id : null, [Validators.required]],
      universityName: [this.fieldToEdit ? this.fieldToEdit.universityName : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      titleType: [this.fieldToEdit ? this.fieldToEdit.titleType.id : null, [Validators.required]],
      educationSubject: [this.fieldToEdit ? this.fieldToEdit.educationSubject : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      graduationYear: [this.fieldToEdit ? this.fieldToEdit.graduationYear : null, [Validators.required, Validators.min(1915), Validators.max(2050)]]
    });
  }

  addOrEditCertificatesForm(item: any) {
    this.fieldToEdit = item;

    this.certificateForm = this.formBuilder.group({
      certificateSubject: [this.fieldToEdit ? this.fieldToEdit.certificateSubject : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      awardedFrom: [this.fieldToEdit ? this.fieldToEdit.awardedFrom : null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      graduationYear: [this.fieldToEdit ? this.fieldToEdit.graduationYear : null, [Validators.required, Validators.min(1915), Validators.max(2050)]]
    });
  }

  ShowDiv(divVal: string) {
    this.currDiv = divVal;
    this.addOrEditLanguageForm(null);
    this.addOrEditSkillsForm(null);
    this.addOrEditEducationForm(null);
    this.addOrEditCertificatesForm(null);
  }

  public checkError = (form: FormGroup, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
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

  addOrEditLanguages() {
    const subjectCategory = "languages";
    const formValue = this.languageForm.value;
    const languageLevel = {
      id: formValue.languageLevel
    }
    const language = {
      language: formValue.language,
      languageLevel: languageLevel
    };

    if (this.fieldToEdit) {
      this.userService.editItem(subjectCategory, this.fieldToEdit.id, language).subscribe(() => {
        this.ngOnInit();
      })
    } else {
      this.userService.addLanguage(this.id, language).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  addOrEditSkill() {
    const subjectCategory = "skills";
    const formValue = this.skillForm.value;
    const skillLevel = {
      id: formValue.skillLevel
    }
    const skill = {
      skill: formValue.skill,
      skillLevel: skillLevel
    };

    if (this.fieldToEdit) {
      this.userService.editItem(subjectCategory, this.fieldToEdit.id, skill).subscribe(() => {
        this.ngOnInit();
      })
    } else {
      this.userService.addSkill(this.id, skill).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  addOrEditEducation() {
    const subjectCategory = "educations";
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

    if (this.fieldToEdit) {
      this.userService.editItem(subjectCategory, this.fieldToEdit.id, education).subscribe(() => {
        this.ngOnInit();
      })
    } else {
      this.userService.addEducation(this.id, education).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  addOrEditCertificate() {
    const subjectCategory = "certificates"
    const formValue = this.certificateForm.value;
    const certificate = {
      certificateSubject: formValue.certificateSubject,
      awardedFrom: formValue.awardedFrom,
      graduationYear: formValue.graduationYear
    };

    if (this.fieldToEdit) {
      this.userService.editItem(subjectCategory, this.fieldToEdit.id, certificate).subscribe(() => {
        this.ngOnInit();
      })
    } else {
      this.userService.addCertificate(this.id, certificate).subscribe(() => {
        this.ngOnInit();
      });
    }
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