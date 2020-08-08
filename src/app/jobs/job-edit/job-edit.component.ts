import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { WorkSphereLookup } from 'src/app/shared/models/input-models/workSpheresLookup';
import { SubSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/sub-sphere';
import { workSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/work-sphere';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobOutputModel } from '../shared/models/output-models/jobOutputModel';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  workSpheres: WorkSphereLookup;
  subSpheres: SubSphereInputModel[];
  selectedWorkSphere: workSphereInputModel;
  isLoading = true;
  editJobForm: FormGroup;
  selectedImage: File;
  job: JobInputModel;
  imgURL: any;
  id: string;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.jobService.getJobById(this.id).subscribe(data => {
      this.job = data;
    });

    this.jobService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
      this.isLoading = false;
      this.editJobForm = this.formBuilder.group({
        jobTitle: [this.job ? this.job.jobTitle: null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        jobDescription: [this.job ? this.job.description : null, [Validators.required, Validators.minLength(15), Validators.maxLength(800)]],
        workSphere: [this.job ? this.job.workSphere.id : null, [Validators.required]],
        subSphere: [this.job ? this.job.subSphere.id : null, [Validators.required]],
        deliveryTime: [this.job ? this.job.deliveryTime : null, [Validators.required, Validators.min(0), Validators.max(180)]],
        jobPrice: [this.job ? this.job.price : null, [Validators.required, Validators.min(0.1)]]
      });
      this.selectedWorkSphere = this.job.workSphere;
      this.filterSubSpheres(this.job.workSphere.id);
      this.imgURL = this.job.jobPicture;
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.editJobForm.controls[controlName].hasError(errorName);
  }

  filterSubSpheres(event: string) {
    this.selectedWorkSphere = this.workSpheres.workSpheres.filter(x => x.id === event)[0];
  }

  editJob() {
    const formValue = this.editJobForm.value;
    const subSphere = {
      id: formValue.subSphere
    }

    const workSphere = {
      id: formValue.workSphere,
      subSphere: subSphere
    }

    const job: JobOutputModel = {
      jobTitle: formValue.jobTitle,
      workSphere: workSphere,
      deliveryTime: formValue.deliveryTime,
      price: formValue.jobPrice,
      description: formValue.jobDescription
    }
    console.log(job);

    this.jobService.editJob(this.id, job).subscribe(() => {
      this.router.navigate(['/jobs/', this.job.userProfileDetails.username, this.id])
    })

    const formData = new FormData;
    formData.append('file', this.selectedImage, this.selectedImage.name);

    this.jobService.editJobImage(this.job.userProfileDetails.userId, this.job.jobTitle, this.id, formData).subscribe();
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];

    console.log("change");
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}

