import { Language } from './language-models/language';
import { Skill } from './skill-models/skill';
import { Education } from './education-models/education';
import { Certificate } from './certificate-models/certificate';
import { Country } from './education-models/country';

export interface UserProfile {
    id: string;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    description: string;
    personalWebsite: string;
    country: Country;
    email: string;
    hasCompletedAccountSetup: boolean;
    createdDate: string;
    profilePicture: string
    languages: [Language];
    skills: [Skill];
    educations: [Education];
    certificates: [Certificate];
}