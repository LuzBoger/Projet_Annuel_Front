import type { RoleEnum } from "./enum/roles";

export interface Account {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
    has2FAEnabled: boolean;
}

export interface AccountInfoResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  has2FAEnabled: boolean;
}
