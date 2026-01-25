export interface UserSettings {
  userSettingsId: string | number;
  publicProfile: boolean;
  showEmail: boolean;
  showLocation: boolean;
  showOnlineStatus: boolean;
  twoFactorAuthentication: boolean;
}
