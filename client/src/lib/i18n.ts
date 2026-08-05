import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import type { LocaleCode } from '@/lib/api'

/**
 * Multilingual setup (guide §2). Selectable locales are English, Nigerian
 * Pidgin (`pcm`, the default brand voice), Hausa, Yoruba, and Igbo. Bundles
 * are served from /public/locales and lazy-loaded per locale + namespace via
 * i18next-http-backend, so a Hausa user never downloads Yoruba/Igbo strings.
 *
 * Detection order: saved localStorage preference → browser language → `pcm`.
 * A DB-backed `users.locale` override lands with the API (Phase 3).
 */
export const SUPPORTED_LOCALES = ['en', 'pcm', 'ha', 'yo', 'ig'] as const
export type { LocaleCode }

export const NAMESPACES = ['common', 'categories', 'landing'] as const

const STORAGE_KEY = 'fundi.locale'

export function getStoredLocale(): LocaleCode | undefined {
  const v = localStorage.getItem(STORAGE_KEY)
  return SUPPORTED_LOCALES.includes(v as LocaleCode) ? (v as LocaleCode) : undefined
}

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: getStoredLocale() ?? undefined,
    fallbackLng: 'pcm',
    defaultNS: 'common',
    ns: [...NAMESPACES],
    supportedLngs: [...SUPPORTED_LOCALES],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
    },
    interpolation: { escapeValue: false },
  })

export function setLocale(code: LocaleCode) {
  localStorage.setItem(STORAGE_KEY, code)
  void i18n.changeLanguage(code)
}

export default i18n
