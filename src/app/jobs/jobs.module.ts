import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAddComponent } from './job-add/job-add.component';
import { JobComponent } from './job/job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobService } from './shared/job.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { JobsAllComponent } from './jobs-all/jobs-all.component';
import { SharedModule } from '../shared/shared.module';
import { JobEditComponent } from './job-edit/job-edit.component';



@NgModule({
  declarations: [JobAddComponent, JobComponent, JobsAllComponent, JobEditComponent],
  providers: [
    JobService
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AuthModule,
    SharedModule
  ]
})
export class JobsModule { }
