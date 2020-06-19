import { Language } from './language-models/language';
import { workSphere } from './work-spheres/work-sphere';
import { Skill } from './skill-models/skill';
import { Education } from './education-models/education';
import { Certificate } from './certificate-models/certificate';

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    personalWebsite: string;
    country: string;
    email: string;
    profilePicture: string
    languages: [Language];
    workSpheres: [workSphere];
    skills: [Skill];
    educations: [Education];
    certificates: [Certificate];
}