// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhHk from './locales/zh-HK.json';
import ja from './locales/ja.json';
import vi from './locales/vi.json';

i18n.use(initReactI18next).init({
    resources: {
        'en': { translation: en },
        'zh-CN': { translation: zhCN },
        'zh-HK': { translation: zhHk },
        'ja': { translation: ja },
        'vi': { translation: vi },
    },
    lng: 'en', // 设置默认语言
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false // React 已经对 XSS 进行保护
    }
});

export default i18n;