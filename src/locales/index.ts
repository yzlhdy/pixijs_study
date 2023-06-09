import { createI18n } from "vue-i18n";
import type { App } from "vue";

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>("../locales/*.json", { eager: true })
  ).map(([key, value]) => {
    const json = key.endsWith(".json");
    return [key.slice(2, json ? -5 : -4), value.default];
  })
);

const language: string = "zh-CN";

const i18n: any = createI18n({
  locale: language,
  messages: messages,
  fallbackLocale: "zh-CN",
  legacy: false,
});

export function setupI18n(app: App) {
  app.use(i18n);
}

export function t(key: string) {
  return i18n.global.t(key);
}

export function setLocale(locale: string) {
  i18n.global.locale = locale;
}
