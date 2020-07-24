import { Component, OnInit } from '@angular/core';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  jobs: JobInputModel[];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getFiveJobsInWebProgramming().subscribe(data => {
      this.jobs = data;
      this.isLoading = false;
    });
  }

}
