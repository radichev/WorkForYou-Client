import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UserProfileComponent],
  providers: [
    AuthGuard
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    HttpClientModule
  ]
})
export class UsersModule { }
