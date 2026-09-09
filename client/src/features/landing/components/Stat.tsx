import { Display } from '@/components/ui/Display'

/** Stamped stat on the landing stats card — big colored display value. */
export function Stat({ value, label, color = 'text-red' }: { value: string; label: string; color?: string }) {
  return (
    <div className="px-4 py-6 text-center tablet:py-2">
      <Display as="p" className={`font-display text-3xl leading-none tablet:text-4xl ${color}`}>
        {value}
      </Display>
      <p className="mt-2 text-xs font-bold uppercase tracking-widest text-ink/60">{label}</p>
    </div>
  )
}
