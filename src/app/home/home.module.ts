import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeService } from './shared/home.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  declarations: [HomepageComponent, HomeComponent, IndexComponent],
  providers: [
    HomeService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    SharedModule,
    MatProgressSpinnerModule,
    Ng2CarouselamosModule
  ]
})
export class HomeModule { }
