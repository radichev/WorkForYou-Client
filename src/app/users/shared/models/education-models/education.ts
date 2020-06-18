import { Country } from './country';
import { TitleType } from './title-type';

export interface Education {
    country: Country
    universityName: string;
    titleType: TitleType
    educationSubject: string;
    graduationYear: number;
}