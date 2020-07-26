import { Component, OnInit } from '@angular/core';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { HomeService } from '../shared/home.service';
import { WorkSphereLookup } from 'src/app/shared/models/input-models/workSpheresLookup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  jobs: JobInputModel[];
  workSpheres: WorkSphereLookup;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getFiveJobsInWebProgramming().subscribe(data => {
      this.jobs = data;
      this.isLoading = false;
    });

    this.homeService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
    });
  }

}
