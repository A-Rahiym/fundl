import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '../locales/en/common.json'
import haCommon from '../locales/ha/common.json'
import yoCommon from '../locales/yo/common.json'
import igCommon from '../locales/ig/common.json'

/**
 * Minimal i18n wiring for the design-system build.
 * Detection: saved localStorage preference → browser language → `en`.
 * DB-backed `users.locale` override arrives with the API (Phase 3).
 */
export const SUPPORTED_LOCALES = ['en', 'ha', 'yo', 'ig'] as const
export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'fundi.locale'

export function getStoredLocale(): LocaleCode | undefined {
  const v = localStorage.getItem(STORAGE_KEY)
  return SUPPORTED_LOCALES.includes(v as LocaleCode) ? (v as LocaleCode) : undefined
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      ha: { common: haCommon },
      yo: { common: yoCommon },
      ig: { common: igCommon },
    },
    lng: getStoredLocale() ?? undefined,
    fallbackLng: 'en',
    defaultNS: 'common',
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
