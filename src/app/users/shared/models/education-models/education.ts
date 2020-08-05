import { Country } from './country';
import { TitleType } from './title-type';

export interface Education {
    id:string
    country: Country
    universityName: string;
    titleType: TitleType
    educationSubject: string;
    graduationYear: number;
}