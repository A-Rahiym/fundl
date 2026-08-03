/**
 * Diacritic detection for Nigerian language orthographies (guide §2.4).
 * Yoruba subdot vowels (ẹ ọ ṣ) and Igbo (ị ọ ụ ṅ) live in the Latin
 * Extended Additional block (U+1E00–U+1EFF); combining tone marks in
 * U+0300–U+036F. Alfa Slab One and Caveat are missing these glyphs, so
 * any string containing them must fall back to a fully-covered face.
 */
const DIACRITIC_RE = /[\u1E00-\u1EFF]|\p{M}/u

export function hasDiacritics(text: string): boolean {
  return DIACRITIC_RE.test(text)
}

/** Append the fallback class when the string needs a full-coverage face. */
export function diacriticClass(text: string, className: string): string {
  return hasDiacritics(text) ? `${className} needs-diacritic-fallback` : className
}
