import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

const resources = {
  en: {
    translation: {
      settings: "Settings",
      appearance: "APPEARANCE",
      dark_mode: "Dark Mode",
      language: "Language",
      system: "SYSTEM",
      background_sync: "Background Sync",
      active: "Active",
      sync_description: "Updates delivery schedules automatically.",
      sync_now: "Sync Now",
      restart_required: "Restart Required",
      app_will_restart: "The app will restart to apply language changes.",
      ok: "OK",
      done: "Done"
    }
  },
  ar: {
    translation: {
      settings: "الإعدادات",
      appearance: "المظهر",
      dark_mode: "الوضع الليلي",
      language: "اللغة",
      system: "النظام",
      background_sync: "المزامنة الخلفية",
      active: "نشط",
      sync_description: "تحديث جداول التسليم تلقائياً.",
      sync_now: "مزامنة الآن",
      restart_required: "إعادة تشغيل مطلوبة",
      app_will_restart: "سيتم إعادة تشغيل التطبيق لتطبيق تغييرات اللغة.",
      ok: "حسناً",
      done: "تم"
    }
  }
};

const isRTL = I18nManager.isRTL;

i18n.use(initReactI18next).init({
  resources,
  lng: isRTL ? 'ar' : 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
