export type SettingsTab = 'profile' | 'password' | '2fa';

export interface MenuItem {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
}