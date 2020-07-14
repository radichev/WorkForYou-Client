import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAddComponent } from './job-add/job-add.component';
import { JobComponent } from './job/job.component';



@NgModule({
  declarations: [JobAddComponent, JobComponent],
  imports: [
    CommonModule
  ]
})
export class JobsModule { }
