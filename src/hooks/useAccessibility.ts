import { DEFAULT_SETTINGS, STORAGE_KEY } from "@/constants/accessibility";
import { applySettings } from "@/lib/utils/accessibility";
import { AccessibilitySettings } from "@/types/components/accessibility";
import { useCallback, useEffect, useState } from "react";

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(local) };
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      applySettings(next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    applySettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, updateSettings, resetSettings };
}
