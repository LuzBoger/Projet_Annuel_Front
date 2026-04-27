import { LanguageResponse } from "../language/language";
import { UserLanguageResponse } from "../userLanguage/userLanguage";
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
  accountId: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  bio?: string;
  countryCode?: string;
  timezone?: string;
  isPublic: boolean;
  hasCompletedOnboarding: boolean;
  languages?: UserLanguageResponse[];
  activeLanguage?: LanguageResponse | null;
  createdAt?: string;
  updatedAt?: string;
}


