export type SettingsTab = 'profile' | 'password' | '2fa' | 'language';

export interface MenuItem {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
}