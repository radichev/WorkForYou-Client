import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../shared/job.service';
import { WorkSphereLookup } from '../shared/models/input-models/workSpheresLookup';
import { JwtService } from 'src/app/shared/jwt.service';
import { SubSphereInputModel } from '../shared/models/input-models/work-spheres/sub-sphere';
import { workSphereInputModel } from '../shared/models/input-models/work-spheres/work-sphere';
import { JobOutputModel } from '../shared/models/output-models/jobOutputModel';

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

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.id =  this.jwtService.getUserId;

    this.jobService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
      this.isLoading = false;
    })

    this.addJobForm = this.formBuilder.group({
      jobName: [null, [Validators.required]],
      jobDescription: [null, [Validators.required]],
      workSphere: [null, [Validators.required]],
      subSphere: [null, [Validators.required]],
      deliveryTime: [null, [Validators.required]],
      jobPrice: [null, [Validators.required]]
    });
  }

  filterSubSpheres(event) {
    this.selectedWorkSphere = this.workSpheres.workSpheres.filter(x => x.id === event)[0];
    this.selectedWorkSphere.subSpheres.sort((a,b) => a.subSphere.localeCompare(b.subSphere));
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
      jobTitle: formValue.jobName,
      workSphere: workSphere,
      deliveryTime: formValue.deliveryTime,
      price: formValue.jobPrice,
      description: formValue.jobDescription
    }    

    this.jobService.addJob(this.id, job).subscribe(data => {
      console.log(data);
    });
  }

}
