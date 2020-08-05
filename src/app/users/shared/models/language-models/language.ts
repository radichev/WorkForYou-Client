import { LanguageLevel } from './language-level';

export interface Language {
  id: string;
  language: string;
  languageLevel: LanguageLevel;
}