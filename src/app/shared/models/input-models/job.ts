
import { workSphereInputModel } from './work-spheres/work-sphere';
import { SubSphereInputModel } from './work-spheres/sub-sphere';
import { UserProfileInputModel } from './user-profile/user-profile';

export interface JobInputModel {
    id: string;
    jobTitle: string;
    workSphere: workSphereInputModel;
    subSphere: SubSphereInputModel;
    deliveryTime: number;
    jobPicture:string;
    price: number;
    description: string;
    userProfileDetails: UserProfileInputModel;
}