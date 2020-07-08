import { LanguageLevel } from './language-models/language-level';
import { SkillLevel } from './skill-models/skill-level';
import { TitleType } from './education-models/title-type';
import { Country } from './education-models/country';

export interface LookupTables {
    languageLevels: [LanguageLevel]
    skillLevels: [SkillLevel]
    titleTypes: [TitleType]
    countries: [Country]
}