import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WorkSphereLookup } from '../../shared/models/input-models/workSpheresLookup';
import { JobOutputModel } from './models/output-models/jobOutputModel';
import { JobInputModel } from 'src/app/shared/models/input-models/job';

@Injectable()
export class JobService {

  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`
  private readonly ADD_JOB_LOOKUP_URL = `${environment.apiUrl}/jobs/add/`
  private readonly GET_JOB_BY_ID_URL = `${environment.apiUrl}/jobs/`
  private readonly ALL_JOBS_BY_SUB_SPHERES_URL = `${environment.apiUrl}/jobs/sub-sphere/`


  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }

  addJob(id: string, jobModel: JobOutputModel) {
    return this.http.post(this.ADD_JOB_LOOKUP_URL + id, jobModel);
  }

  getJobById(id: string) {
    return this.http.get<JobInputModel>(this.GET_JOB_BY_ID_URL + id);
  }

  getAllJobsInSubSphere(subSphereId: string, page: number, size: number) {
    return this.http.get<JobInputModel[]>(this.ALL_JOBS_BY_SUB_SPHERES_URL + subSphereId + '/all?page=' + page + '&size=' + size);
  }
}
