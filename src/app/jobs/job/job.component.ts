import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { ActivatedRoute, Router } from '@angular/router';
import { JobBuyOutputModel } from '../shared/models/output-models/jobBuyOutputModel';
import { JwtService } from 'src/app/shared/jwt.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  isLoading = true;
  job: JobInputModel;
  jobBuyModel: JobBuyOutputModel;
  id: string;
  isUserAuthor: boolean;

  constructor(private jobService: JobService, private route: ActivatedRoute, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.jobService.getJobById(this.id).subscribe(data => {
      this.job = data;
      this.isLoading = false;
      this.isUserAuthor = this.jwtService.getUserId === this.job.userProfileDetails.userId;
    });
  }

  buyJob() {
    this.jobBuyModel = {
      userId: this.jwtService.getUserId,
      jobId: this.job.id
    }

    this.jobService.buyJob(this.job.id, this.jobBuyModel).subscribe(() => {
      this.router.navigate(['/users/profile', this.jwtService.getUserId])
    });
  }

  deleteJob() {
    this.jobService.deleteJob(this.id).subscribe(() => {
      this.router.navigate(['/users/profile', this.job.userProfileDetails.userId])
    });
  }
}
