import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WorkSphereLookup } from '../../shared/models/input-models/workSpheresLookup';
import { JobOutputModel } from './models/output-models/jobOutputModel';
import { JobInputModel } from 'src/app/shared/models/input-models/job';
import { JobBuyOutputModel } from './models/output-models/jobBuyOutputModel';

@Injectable()
export class JobService {

  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`
  private readonly ADD_JOB_URL = `${environment.apiUrl}/jobs/add/`
  private readonly GET_JOB_BY_ID_URL = `${environment.apiUrl}/jobs/`
  private readonly ALL_JOBS_BY_SUB_SPHERES_URL = `${environment.apiUrl}/jobs/sub-sphere/`
  private readonly BUY_JOB_URL = `${environment.apiUrl}/jobs/buy/`
  private readonly EDIT_JOB_URL = `${environment.apiUrl}/jobs/edit/`
  private readonly DELETE_JOB_URL = `${environment.apiUrl}/jobs/`
  private readonly UPDATE_JOB_IMAGE_URL = `${environment.apiUrl}/jobs/{userId}/{jobTitle}/image/edit`


  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }

  addJob(id: string, jobModel: FormData) {
    return this.http.post(this.ADD_JOB_URL + id, jobModel);
  }

  editJob(id: string, jobModel: JobOutputModel) {
    return this.http.post(this.EDIT_JOB_URL + id, jobModel);
  }

  getJobById(id: string) {
    return this.http.get<JobInputModel>(this.GET_JOB_BY_ID_URL + id);
  }

  getAllJobsInSubSphere(subSphereId: string, page: number, size: number) {
    return this.http.get<JobInputModel[]>(this.ALL_JOBS_BY_SUB_SPHERES_URL + subSphereId + '/all?page=' + page + '&size=' + size);
  }

  buyJob(id: string, jobBuyOutputModel: JobBuyOutputModel) {
    return this.http.post(this.BUY_JOB_URL + id, jobBuyOutputModel);
  }

  deleteJob(id: string) {
    return this.http.delete(this.DELETE_JOB_URL + id)
  }

  editJobImage(userId: string, jobTitle: string, id: string, formData: FormData) {
    return this.http.post(`${environment.apiUrl}/jobs/${userId}/${jobTitle}/${id}/image/edit`, formData);
  }
}
