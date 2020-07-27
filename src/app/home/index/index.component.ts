import { Component, OnInit } from '@angular/core';
import { SubSphereInputModel } from 'src/app/shared/models/input-models/work-spheres/sub-sphere';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  subSpheres: SubSphereInputModel[];
  isLoading = true;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getFiveSubSpheres().subscribe(data => {
      this.subSpheres = data;
      this.isLoading = false;
    });
  }

}
