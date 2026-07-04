export type FontSize = 'normal' | 'large' | 'xlarge';
export type ToggleAccessibility = 'highContrast' | 'reducedMotion' | 'underlineLinks' | 'dyslexia';

export interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  dyslexia: boolean;
}

export interface FontSizeOption {
  value: FontSize;
  label: string;
  sample: string;
}

