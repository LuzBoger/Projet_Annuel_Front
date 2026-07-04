import { AccessibilitySettings } from "@/types/components/accessibility";

export function applySettings(settings: AccessibilitySettings) {
  const html = document.documentElement;
  html.setAttribute('data-accessibility-text', settings.fontSize);
  html.setAttribute('data-accessibility-contrast', settings.highContrast ? 'high' : 'normal');
  html.setAttribute('data-accessibility-motion', settings.reducedMotion ? 'reduced' : 'normal');
  html.setAttribute('data-accessibility-links', settings.underlineLinks ? 'underline' : 'normal');
  html.setAttribute('data-accessibility-dyslexia', settings.dyslexia ? 'on' : 'off');
}

export function countActiveSettings(settings: AccessibilitySettings) {
  return (
    [settings.highContrast, settings.reducedMotion, settings.underlineLinks, settings.dyslexia].filter(Boolean).length +
    (settings.fontSize !== 'normal' ? 1 : 0)
  );
}