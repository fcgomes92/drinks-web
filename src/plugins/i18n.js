import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../lang/en";
import ptBR from "../lang/ptBR";
import es from "../lang/es";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "en", // set locale
  fallbackLocale: "en",
  messages: {
    ...en,
    ...ptBR,
    ...es
  } // set locale messages
});

// const loadedLanguages = ["en", "ptBR"]; // our default language that is preloaded

// function setI18nLanguage(lang) {
//   i18n.locale = lang;
//   axios.defaults.headers.common["Accept-Language"] = lang;
//   if (typeof document !== "undefined") document.querySelector("html").setAttribute("lang", lang);
//   return lang;
// }

// export function loadLanguageAsync(lang = "en") {
//   // If the same language
//   if (i18n.locale === lang) {
//     return Promise.resolve(setI18nLanguage(lang));
//   }

//   // If the language was already loaded
//   if (loadedLanguages.includes(lang)) {
//     return Promise.resolve(setI18nLanguage(lang));
//   }

//   // If the language hasn't been loaded yet
//   return import(/* webpackChunkName: "lang-[request]" */ `../lang/${lang}.js`).then(messages => {
//     i18n.setLocaleMessage(lang, messages.default);
//     loadedLanguages.push(lang);
//     return setI18nLanguage(lang);
//   });
// }

export default ({ app }) => {
  app.i18n = i18n;
};
