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
  webProgrammingJobs: JobInputModel[];
  videoEditingJobs: JobInputModel[];
  workSpheres: WorkSphereLookup;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getFiveJobsInWebProgramming().subscribe(data => {
      this.webProgrammingJobs = data;
      this.webProgrammingJobs
        .forEach(job => job.picture = "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/122982910/original/46a9da9988ad14b744b56ae30003c448bd314567.png");
    });

    this.homeService.getFiveJobsInVideoEditing().subscribe(data => {
      this.videoEditingJobs = data;
      this.videoEditingJobs
        .forEach(job => job.picture = "https://www.craftedny.com/news/wp-content/uploads/2019/03/the-essential-stages-of-corporate-video-editing.jpg");
    });

    this.homeService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
      this.isLoading = false;
    });
  }

}
