
import { PictureModel } from './pictures-model/picture';
import { workSphereInputModel } from './work-spheres/work-sphere';

export interface JobInputModel {
    id: string;
    jobTitle: string;
    workSphere: workSphereInputModel;
    deliveryTime: number;
    price: number;
    description: string;
    pictures: [PictureModel];
}