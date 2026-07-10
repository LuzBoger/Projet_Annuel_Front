import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
    de: { translation: de },
    it: { translation: it },
  },
  lng: localStorage.getItem("language") || "fr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
});

export default i18n;
