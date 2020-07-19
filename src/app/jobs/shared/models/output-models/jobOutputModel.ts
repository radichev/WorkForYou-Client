import { workSphereOutputModel } from './work-spheres/work-sphere';

export interface JobOutputModel {
    jobTitle: string;
    workSphere: workSphereOutputModel;
    deliveryTime: number;
    price: number;
    description: string;
}