import { Display } from '../../../components/Display'

/** Landing section header: Caveat kicker over an Alfa Slab One title. */
export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Display as="p" className="font-hand text-[20px] text-ink/70">
        {kicker}
      </Display>
      <Display as="h2" className="font-display text-2xl leading-tight tablet:text-[26px]">
        {title}
      </Display>
    </div>
  )
}
