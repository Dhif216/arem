import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  // loads translations from the /public/locales folder
  .use(HttpBackend)
  // Detects user language (from localStorage, browser settings, etc.)
  .use(LanguageDetector)
  // Passes i18n instance to react-i18next
  .use(initReactI18next)
  // Initializes i18next
  .init({
    // Set the languages your site supports
    supportedLngs: ['fr', 'tn'],

    // Language to use if translations are not available (can be French by default)
    fallbackLng: 'fr',

    // Default namespace file (we named ours 'translation')
    defaultNS: 'translation',

    // Configuration for the Language Detector
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },

    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // React-i18next configuration (important for Suspense)
    react: {
      useSuspense: true,
    },

    // Debug mode (useful during initial setup)
    debug: true,
  });

export default i18n;