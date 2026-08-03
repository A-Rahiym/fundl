import { Display } from '@/components/Display'

/** Stamped stat on the ink "stats plank" (mockup §9). */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-6 text-center tablet:py-2">
      <Display as="p" className="font-display text-2xl leading-none text-yellow tablet:text-3xl">
        {value}
      </Display>
      <p className="mt-2 text-xs uppercase tracking-widest text-white/60">{label}</p>
    </div>
  )
}
