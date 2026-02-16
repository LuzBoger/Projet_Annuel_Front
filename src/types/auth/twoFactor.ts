export interface Verify2FARequest {
    tempUserId: string;
    code: string;
}

export interface Enable2FARequest {
    deviceName?: string;

}

export interface Verify2FASetupRequest {
  twoFactorAuthId: string;
  code: string;
}

export interface Disable2FARequest {
  code: string;
}

export interface Enable2FAResponse {
  twoFactorAuthId: string;
  secret: string;
  qrCodeUri: string;
  message: string;
}

