import { workSphereInputModel } from './work-spheres/work-sphere';
import { PictureModel } from './pictures-model/picture';

export interface JobInputModel {
    id: string;
    workSphere: workSphereInputModel;
    deliveryTime: number;
    price: number;
    description: string;
    pictures: [PictureModel];
}