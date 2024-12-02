import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import HTTPApi from "i18next-http-backend";

i18n.use(initReactI18next)
.use(LanguageDetector)
.use(HTTPApi)
.init({
  fallbackLng: "en",
  keySeparator: false, // Allow for nested translations without using dots
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;