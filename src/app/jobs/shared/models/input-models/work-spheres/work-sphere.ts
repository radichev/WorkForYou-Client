import { SubSphereInputModel } from './sub-sphere';

export interface workSphereInputModel {
  id: string;
  workSphere: string;
  subSpheres: [SubSphereInputModel];
}