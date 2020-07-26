import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { WorkSphereLookup } from 'src/app/shared/models/input-models/workSpheresLookup';

@Injectable()
export class HomeService {

  private readonly GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL = `${environment.apiUrl}/jobs/web-programming`
  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`


  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }

  getFiveJobsInWebProgramming() {
    return this.http.get<JobInputModel[]>(this.GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL);
  }
}
