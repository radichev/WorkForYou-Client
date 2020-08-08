import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../shared/job.service';
import { WorkSphereLookup } from '../../shared/models/input-models/workSpheresLookup';
import { JwtService } from 'src/app/shared/jwt.service';
import { JobOutputModel } from '../shared/models/output-models/jobOutputModel';
import { SubSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/sub-sphere';
import { workSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/work-sphere';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  workSpheres: WorkSphereLookup;
  subSpheres: SubSphereInputModel[];
  selectedWorkSphere: workSphereInputModel;
  isLoading = true;
  addJobForm: FormGroup;
  job: JobOutputModel;
  id: string;
  selectedImage: File;
  imgURL: any;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.jwtService.getUserId;

    this.jobService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
      this.isLoading = false;
    })

    this.addJobForm = this.formBuilder.group({
      jobTitle: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      jobDescription: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(800)]],
      workSphere: [null, [Validators.required]],
      subSphere: [null, [Validators.required]],
      deliveryTime: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
      jobPrice: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addJobForm.controls[controlName].hasError(errorName);
  }

  filterSubSpheres(event: string) {
    this.selectedWorkSphere = this.workSpheres.workSpheres.filter(x => x.id === event)[0];
  }

  addJob() {
    const formValue = this.addJobForm.value;
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

    const formData = new FormData;
    formData.append('file', this.selectedImage, this.selectedImage.name);
    formData.append('job', new Blob([JSON.stringify(job)], {
                type: "application/json"
            }));

    this.jobService.addJob(this.id, formData).subscribe(data => {
      this.router.navigate(['/users/profile/' + this.id])
    });
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
