import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  isLoading = true;
  job: JobInputModel;
  id: string;

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.jobService.getJobById(this.id).subscribe(data => {
      this.job = data;
      this.isLoading = false;
    });
  }

  buyJob() {
    
  }
}
