import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job/job.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { JobAddComponent } from './job-add/job-add.component';

const routes: Routes = [
  {
    path: 'job/add',
    component: JobAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/job/:id',
    component: JobComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
