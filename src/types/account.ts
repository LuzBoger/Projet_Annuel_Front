import type { RoleEnum } from "@/types/enum/roles";

export interface Account {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
    has2FAEnabled: boolean;
    hasCompletedOnboarding: boolean;
}

export interface AccountInfoResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  has2FAEnabled: boolean;
  hasCompletedOnboarding: boolean;

}


export interface CompleteOnboardingRequest {
  nativeLanguageId: string | null;
  learningLanguageId: string | null;
}
