import { Display } from '@/components/ui/Display'

/** Landing section header: pastel kicker pill over an Alfa Slab One title. */
export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Display
        as="p"
        className="inline-block -rotate-1 rounded-full border-2 border-ink bg-white px-3 py-1 font-hand text-[18px] leading-none text-ink shadow-small"
      >
        {kicker}
      </Display>
      <Display as="h2" className="font-display text-2xl uppercase leading-tight tracking-tight tablet:text-[26px]">
        {title}
      </Display>
    </div>
  )
}
