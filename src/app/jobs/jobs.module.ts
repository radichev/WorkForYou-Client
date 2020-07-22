import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAddComponent } from './job-add/job-add.component';
import { JobComponent } from './job/job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { AuthGuard } from '../shared/guards/auth.guard';
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



@NgModule({
  declarations: [JobAddComponent, JobComponent],
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
    AuthModule
  ]
})
export class JobsModule { }
