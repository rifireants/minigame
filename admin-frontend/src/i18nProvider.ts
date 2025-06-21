import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';
import koreanMessages from './i18n/ko';

const messages: Record<string, any> = {
  en: englishMessages,
  ko: koreanMessages,
};

const i18nProvider = polyglotI18nProvider(
  locale => messages[locale] || englishMessages,
  'ko',
  {
    allowMissing: false, // 키 누락 방지
    onMissingKey: (key: any) => {
      console.warn('❗ i18n missing:', key);
      return key;
    },
  }
);

export default i18nProvider;
