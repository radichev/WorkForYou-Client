import { workSphere } from './work-spheres/work-sphere';
import { PictureModel } from './pictures-model/picture';

export interface JobModel {
    id: string;
    workSphere: workSphere;
    deliveryTime: number;
    price: number;
    description: string;
    pictures: [PictureModel];
}