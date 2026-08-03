import { Header } from './components/Header'
import { Button } from './components/Button'
import { Panel } from './components/Panel'
import { CategoryTile } from './components/CategoryTile'
import { ArtisanCard } from './components/ArtisanCard'
import { JobCard } from './components/JobCard'
import { StickyNote } from './components/StickyNote'
import { StatusStamp } from './components/StatusStamp'
import { Icon } from './components/icons'
import type { IconName } from './components/icons'
import { BottomNav } from './components/BottomNav'
import { Field, TextInput, Textarea, CheckpointRow } from './components/form'
import type { TagColor } from './components/CategoryTag'
import type { StampTone } from './components/StatusStamp'
import { Logo } from './components/Logo'

const CATEGORIES: Array<{ icon: IconName; name: string; count: string }> = [
  { icon: 'hammer', name: 'Carpentry', count: '480 fundis' },
  { icon: 'wrench', name: 'Plumbing', count: '312 fundis' },
  { icon: 'bolt', name: 'Electrical', count: '265 fundis' },
  { icon: 'needle', name: 'Tailoring', count: '540 fundis' },
  { icon: 'roller', name: 'Painting', count: '198 fundis' },
  { icon: 'trowel', name: 'Masonry', count: '176 fundis' },
]

const ARTISANS: Array<{
  name: string
  category: string
  categoryColor: TagColor
  rating: number
  reviews: number
  rate: string
  rateType: string
  available: boolean
  photoVariant: 'red' | 'blue' | 'green'
}> = [
  { name: 'Adaeze Okafor', category: 'Tailoring', categoryColor: 'red', rating: 4.8, reviews: 126, rate: '2,500', rateType: 'fix', available: true, photoVariant: 'red' },
  { name: 'Musa Ibrahim', category: 'Carpentry', categoryColor: 'green', rating: 4.9, reviews: 204, rate: '15,000', rateType: 'job', available: true, photoVariant: 'blue' },
  { name: 'Kemi Adeyemi', category: 'Electrical', categoryColor: 'yellow', rating: 4.7, reviews: 98, rate: '5,000', rateType: 'hr', available: false, photoVariant: 'green' },
  { name: 'Chinedu Nwosu', category: 'Masonry', categoryColor: 'blue', rating: 4.6, reviews: 73, rate: '20,000', rateType: 'job', available: true, photoVariant: 'red' },
]

const JOBS: Array<{
  title: string
  category: string
  categoryColor: TagColor
  location: string
  time: string
  budget: string
  statusTone: StampTone
  statusLabel: string
  offers: number
}> = [
  { title: 'Fix leaking kitchen tap', category: 'Plumbing', categoryColor: 'blue', location: 'Lekki', time: '2 hr ago', budget: '8,000', statusTone: 'open', statusLabel: 'Open', offers: 4 },
  { title: 'Repair bedroom ceiling fan', category: 'Electrical', categoryColor: 'yellow', location: 'Surulere', time: 'Yesterday', budget: '12,000', statusTone: 'in-progress', statusLabel: 'In progress', offers: 2 },
  { title: 'Tailor 3 corporate shirts', category: 'Tailoring', categoryColor: 'red', location: 'Ikeja', time: '3 days ago', budget: '9,500', statusTone: 'completed', statusLabel: 'Completed', offers: 5 },
]

const NOTES: Array<{ quote: string; attribution: string }> = [
  { quote: 'She fixed my generator wiring in one hour and charged exactly what she quoted.', attribution: 'Tunde, Lekki' },
  { quote: 'The carpenter showed up when he said he would. A miracle in this city.', attribution: 'Amara, Surulere' },
  { quote: 'Finally found a tailor who understands "simple but sharp".', attribution: 'Yusuf, Ikeja' },
]

const STEPS: Array<{ title: string; desc: string }> = [
  { title: 'Post a job', desc: 'Describe what you need, in any language you like.' },
  { title: 'Get offers', desc: 'Fundis near you send their price and time.' },
  { title: 'Choose your fundi', desc: 'Pick from reviews, rating and reputation stamps.' },
  { title: 'Job done', desc: 'Pay, review, and stamp the wall with your experience.' },
]

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <p className="font-hand text-[20px] text-ink/70">{kicker}</p>
      <h2 className="font-display text-2xl leading-tight tablet:text-[26px]">{title}</h2>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-xl text-yellow">{value}</p>
      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-white/70">{label}</p>
    </div>
  )
}

function SystemToolkit() {
  return (
    <Panel tilt="tilt-n5" className="p-6 text-left tablet:p-8">
      <h3 className="font-display text-lg">The toolkit</h3>
      <div className="mt-1 font-hand text-[18px] text-ink/60">buttons · stamps · forms</div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Buttons</h4>
      <div className="mt-3 flex flex-wrap gap-3">
        <Button variant="primary">Post a job</Button>
        <Button variant="blue">Primary blue</Button>
        <Button variant="green">Accept offer</Button>
        <Button variant="red">Decline</Button>
        <Button variant="outline">Browse fundis</Button>
        <Button variant="ghost">Save draft</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button disabled>Disabled</Button>
      </div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Stamps</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusStamp tone="open">Open</StatusStamp>
        <StatusStamp tone="in-progress">In progress</StatusStamp>
        <StatusStamp tone="completed">Completed</StatusStamp>
        <StatusStamp tone="cancelled">Cancelled</StatusStamp>
        <StatusStamp tone="available" icon={<Icon name="check" size={12} />}>Available now</StatusStamp>
        <StatusStamp tone="unavailable">Booked</StatusStamp>
      </div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Forms</h4>
      <div className="mt-3 grid gap-4 tablet:grid-cols-2">
        <Field label="Job title" htmlFor="demo-title">
          <TextInput id="demo-title" placeholder="e.g. Fix leaking tap" />
        </Field>
        <Field label="Budget" htmlFor="demo-budget">
          <TextInput id="demo-budget" placeholder="₦ 5,000" />
        </Field>
        <Field label="Details" htmlFor="demo-details" className="tablet:col-span-2">
          <Textarea id="demo-details" placeholder="Describe the job — you can write this in any language." />
        </Field>
      </div>
      <div className="mt-6">
        <CheckpointRow steps={['Details', 'Budget', 'Confirm']} current={1} />
      </div>
    </Panel>
  )
}

export default function App() {
  return (
    <div className="min-h-screen pb-24 tablet:pb-12">
      <Header register="street" />

      <main className="mx-auto w-full max-w-[1180px] px-4 tablet:px-8">
        {/* ---- Hero (Street) ---- */}
        <section className="mt-10 grid gap-8 desktop:grid-cols-2 desktop:items-center">
          <div className="text-left">
            <p className="font-hand text-[22px] leading-none text-ink/70">Hand-painted talent, real handwork</p>
            <h1 className="mt-3 font-display text-[34px] leading-[1.14] tablet:text-[44px] desktop:text-[56px]">
              Find the right fundi.
              <br />
              <span className="text-red">Signed, sealed, delivered.</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] text-ink/70">
              Post a job, meet trusted artisans in your area, and let the wall of
              hand-painted signs do the talking.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary">Post a job</Button>
              <Button variant="outline">Browse fundis</Button>
            </div>

            <Panel variant="small" tilt="tilt-n8" inset className="mt-8 flex justify-around gap-4 bg-ink p-4 text-white">
              <Stat value="1,200+" label="jobs done" />
              <Stat value="480" label="fundis" />
              <Stat value="4.9" label="avg rating" />
            </Panel>
          </div>

          <div className="hidden justify-center desktop:flex">
            <Panel tilt="tilt-9" inset className="relative max-w-[420px] bg-red p-8 text-left text-white">
              <span className="absolute -top-2.5 left-10 h-4 w-4 rounded-full border-2 border-ink bg-yellow shadow-[1px_1px_0_var(--color-ink)]" aria-hidden="true" />
              <p className="font-hand text-[22px] text-white/90">We dey work, sharp sharp</p>
              <p className="mt-4 font-display text-5xl leading-none">READY</p>
              <p className="mt-2 font-display text-5xl leading-none text-yellow">TO CARRY GO</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <StatusStamp tone="available" icon={<Icon name="check" size={12} />}>
                  Available now
                </StatusStamp>
                <StatusStamp tone="neutral">Open today</StatusStamp>
              </div>
            </Panel>
          </div>
        </section>

        {/* ---- Category wall (Street) ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Explore the trades" title="The signboard wall" />
          <div className="mt-6 grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-6">
            {CATEGORIES.map((c, i) => (
              <CategoryTile key={c.name} index={i} {...c} />
            ))}
          </div>
        </section>

        {/* ---- Artisan cards (Street) ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Collectible cards" title="Meet the fundis" />
          <div className="-mx-4 mt-6 flex gap-6 overflow-x-auto px-4 pb-6 pt-2">
            {ARTISANS.map((a, i) => (
              <ArtisanCard key={a.name} index={i} {...a} />
            ))}
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Easy as 1-2-3-4" title="How it works" />
          <div className="mt-8 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex items-start gap-3 text-left desktop:flex-col desktop:items-center desktop:text-center">
                <span className="checkpoint__stamp">{i + 1}</span>
                <div className="desktop:mt-2">
                  <h3 className="font-display text-base">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Job feed (Workshop register, shown on the landing) ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Live on the wall" title="Fresh jobs" />
          <div className="mt-6 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {JOBS.map((j) => (
              <JobCard key={j.title} {...j} />
            ))}
          </div>
        </section>

        {/* ---- Testimonials ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Word on the street" title="From the wall" />
          <div className="mt-8 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {NOTES.map((n) => (
              <StickyNote key={n.attribution} {...n} />
            ))}
          </div>
        </section>

        {/* ---- Design-system toolkit ---- */}
        <section className="mt-20">
          <SectionHeading kicker="Design system, on display" title="The toolkit" />
          <div className="mt-6">
            <SystemToolkit />
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="mx-auto mt-20 w-full max-w-[1180px] border-t-4 border-ink px-4 pb-4 pt-8 text-center tablet:px-8">
        <Logo />
        <p className="mt-3 text-xs text-ink/50">
          Hand-painted trust, one sign at a time. © 2026 FUNDI
        </p>
      </footer>

      <BottomNav active="home" />
    </div>
  )
}
