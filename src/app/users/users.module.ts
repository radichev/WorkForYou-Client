import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserService } from './shared/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [UserProfileComponent],
  providers: [
    AuthGuard,
    UserService
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class UsersModule { }
