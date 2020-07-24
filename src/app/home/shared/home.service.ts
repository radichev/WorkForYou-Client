import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobInputModel } from 'src/app/shared/models/input-models/job';

@Injectable()
export class HomeService {

  private readonly GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL = `${environment.apiUrl}/jobs/web-programming`

  constructor(private http: HttpClient) { }

  getFiveJobsInWebProgramming() {
    return this.http.get<JobInputModel[]>(this.GET_FIVE_JOBS_IN_WEB_PROGRAMMING_URL);
  }
}
