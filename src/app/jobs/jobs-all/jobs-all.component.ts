import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-all',
  templateUrl: './jobs-all.component.html',
  styleUrls: ['./jobs-all.component.css']
})
export class JobsAllComponent implements OnInit {

  page: number = 0;
  size: number = 5;
  jobs: JobInputModel[];
  pages: Array<number>;
  id: string;
  isLoading = true;


  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.jobService.getAllJobsInSubSphere(this.id, this.page, this.size).subscribe(data => {
      this.jobs = data['content'];
      this.pages = new Array(data['totalPages']);
      this.jobs
        .forEach(job => job.picture = "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/122982910/original/46a9da9988ad14b744b56ae30003c448bd314567.png");

      if(this.pages) {
        console.log(this.pages);
      }
      console.log(data);
      this.isLoading = false;
    });
  }

}
