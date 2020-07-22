import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [HomepageComponent, HomeComponent, IndexComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule
  ]
})
export class HomeModule { }
