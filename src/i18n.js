import {createI18n} from "vue-i18n";
import en from './locales/es.json';
import es from './locales/en.json';

const i18n = createI18n({
    locale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        es
    }
})

export default i18n;