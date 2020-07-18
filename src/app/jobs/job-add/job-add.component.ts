import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../shared/job.service';
import { WorkSphereLookup } from '../shared/models/workSpheresLookup';
import { SubSphere } from '../shared/models/work-spheres/sub-sphere';
import { workSphere } from '../shared/models/work-spheres/work-sphere';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  workSpheres: WorkSphereLookup;
  subSpheres: SubSphere[];
  selectedWorkSphere: workSphere;
  isLoading = true;
  addJobForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
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
  }

  addJob() {

  }

}
