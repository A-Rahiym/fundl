import { Display } from '../../../components/Display'

/** Stamped stat on the ink "stats plank". */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <Display as="p" className="font-display text-xl text-yellow">
        {value}
      </Display>
      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-white/70">{label}</p>
    </div>
  )
}
