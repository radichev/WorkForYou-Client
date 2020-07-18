import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WorkSphereLookup } from './models/workSpheresLookup';

@Injectable()
export class JobService {

  private readonly WORK_SPHERES_LOOKUP_URL = `${environment.apiUrl}/work-spheres/all`

  constructor(private http: HttpClient) { }

  getWorkSpheres() {
    return this.http.get<WorkSphereLookup>(`${this.WORK_SPHERES_LOOKUP_URL}`);
  }
}
