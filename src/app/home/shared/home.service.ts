import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { WorkSphereLookup } from 'src/app/shared/models/input-models/workSpheresLookup';
import { SubSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/sub-sphere';

@Injectable()
export class HomeService {

  private readonly GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL = `${environment.apiUrl}/jobs/sub-sphere/Web programming`
  private readonly GET_FIVE_JOBS_IN_VIDEO_EDITING_URL = `${environment.apiUrl}/jobs/sub-sphere/Video Editing`
  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`
  private readonly FIVE_SUB_SPHERES_URL = `${environment.apiUrl}/sub-spheres/five`


  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }

  getFiveJobsInWebProgramming() {
    return this.http.get<JobInputModel[]>(this.GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL);
  }

  getFiveJobsInVideoEditing() {
    return this.http.get<JobInputModel[]>(this.GET_FIVE_JOBS_IN_VIDEO_EDITING_URL);
  }

  getFiveSubSpheres() {
    return this.http.get<SubSphereInputModel[]>(this.FIVE_SUB_SPHERES_URL);
  }
}
