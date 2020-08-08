import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job/job.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { JobAddComponent } from './job-add/job-add.component';
import { JobsAllComponent } from './jobs-all/jobs-all.component';
import { JobEditComponent } from './job-edit/job-edit.component';

const routes: Routes = [
  {
    path: 'job/add',
    component: JobAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: JobEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/:id',
    component: JobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':worksphere/:subsphere/:id',
    component: JobsAllComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
