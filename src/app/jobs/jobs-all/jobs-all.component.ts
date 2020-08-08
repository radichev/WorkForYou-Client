import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSphereLookup } from 'src/app/shared/models/input-models/workSpheresLookup';

@Component({
  selector: 'app-jobs-all',
  templateUrl: './jobs-all.component.html',
  styleUrls: ['./jobs-all.component.css']
})
export class JobsAllComponent implements OnInit {

  page: number = 0;
  size: number = 12;
  jobs: JobInputModel[];
  pages: Array<number>;
  id: string;
  isLoading = true;
  workSpheres: WorkSphereLookup;
  currentSubSphere: string;
  currentWorkSphere: string;
  totalServices: number;


  constructor(private jobService: JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.currentSubSphere = this.route.snapshot.paramMap.get('subsphere').split('-').join(' ');
    this.currentWorkSphere = this.route.snapshot.paramMap.get('worksphere').split('-').join(' ');

    this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 0;
      });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.getJobs();

    this.jobService.getWorkSpheres().subscribe(data => {
      this.workSpheres = data;
      this.isLoading = false;
    });
  }

  getJobs() {
    this.jobService.getAllJobsInSubSphere(this.id, this.page, this.size).subscribe(data => {
      this.jobs = data['content'];
      this.pages = new Array(data['totalPages']);
      this.totalServices = data['totalElements'];
    });
  }

  changePage(i: number) {
    this.router.navigate(['/jobs/', this.currentWorkSphere, this.currentSubSphere, this.id], { queryParams: { page: this.page = i } });
  }

}
