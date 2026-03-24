
export type TypeLanguage = 'NATIVE' | 'LEARNING';

export interface UserLanguageResponse {
  id: string;
  languageId: string;
  languageCode: string;
  languageName: string;
  languageType: TypeLanguage;
  proficiencyLevel?: string;
  startedAt?: string;
}

export interface AddUserLanguageRequest {
    languageId: string;
    languageType: TypeLanguage;
    proficiencyLevel?: string;
}