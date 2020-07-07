import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserService } from './shared/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent, UserProfileEditComponent],
  providers: [
    AuthGuard,
    UserService
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ]
})
export class UsersModule { }
