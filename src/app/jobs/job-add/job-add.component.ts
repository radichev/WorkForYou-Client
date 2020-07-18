import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../shared/job.service';
import { WorkSphereLookup } from '../shared/models/workSpheresLookup';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  workSpheres: WorkSphereLookup;
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
      jobPrice: [null, [Validators.required]]
    });
  }

  addJob() {

  }

}
