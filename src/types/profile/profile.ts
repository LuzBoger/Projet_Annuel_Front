export interface UpdateProfileRequest {
    photoUrl?: string;
    bio?: string;
    username?: string;
    countryCode?: string;
    timezone?: string;
    isPublic?: boolean;
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UploadResponse {
    pathFile: string;
    message: string;
}
export interface UserProfileResponse {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
  bio?: string;
  countryCode?: string;
  timezone?: string;
  isPublic: boolean;
  languages?: UserLanguageResponse[];
}

export interface UserLanguageResponse {
  languageCode: string;
  nativeLanguage: boolean;
  proficiencyLevel: string;
}
