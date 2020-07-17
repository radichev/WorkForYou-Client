import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  addJobForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
