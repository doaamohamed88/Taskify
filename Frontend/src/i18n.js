import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translationEN.json';
import translationAR from './locales/ar/translationAR.json';
const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

i18n
    .use(initReactI18next)
    // .use(HttpApi)
    .init({
        supportedLngs: ['en', 'ar'],
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie', 'querystring', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
