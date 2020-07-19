import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WorkSphereLookup } from './models/input-models/workSpheresLookup';
import { JobInputModel } from './models/input-models/job';
import { JobOutputModel } from './models/output-models/jobOutputModel';

@Injectable()
export class JobService {

  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`
  private readonly ADD_JOB_LOOKUP_URL = `${environment.apiUrl}/jobs/add/`

  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }

  addJob(id: string, jobModel: JobOutputModel) {
    return this.http.post(this.ADD_JOB_LOOKUP_URL + id, jobModel);
  }
}
