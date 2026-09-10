import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { POST_JOB_FIELDS } from '@/config/postJobForm'
import { useCategories } from '@/features/home/hooks/useJobsQueries'
import { CategoryPicker } from '@/components/CategoryPicker'
import { UrgencyPicker, type Urgency } from './components/UrgencyPicker'
import { ZonePicker } from './components/ZonePicker'
import { NIGERIAN_STATES } from '@/config/nigeria'
import { PriceRadar } from './components/PriceRadar'
import { NearbyPros } from './components/NearbyPros'
import { usePostJob } from './hooks/useJobsMutations'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'

const F = POST_JOB_FIELDS

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null
  return (
    <span role="alert" className="text-xs font-bold text-red">
      {t(error)}
    </span>
  )
}

function SectionLabel({ icon, children, hint }: { icon: 'hammer' | 'pin' | 'wallet' | 'calendar'; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-wide text-ink">
        <Icon name={icon} size={20} className="text-red" />
        {children}
      </span>
      {hint && <span className="font-hand text-lg leading-none text-yellow-dark">{hint}</span>}
    </div>
  )
}

/**
 * Post a job (guide/screen/post_job.html) — spec layout, endpoint-only
 * payload: title, description, categoryKey, locationText, budgetMin/Max,
 * preferredDate. Urgency pills and zone shortcuts are UI-only writers
 * into preferredDate/locationText; nothing extra is sent.
 */
export function PostJobPage() {
  const { t } = useTranslation()
  const categories = useCategories()
  const postJob = usePostJob()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryKey, setCategoryKey] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [jobState, setJobState] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [urgency, setUrgency] = useState<Urgency | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const pickUrgency = (u: Urgency) => {
    setUrgency(u)
    setPreferredDate(u === 'schedule' ? '' : todayISO())
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!title.trim()) next.title = F.title.errorKey!
    if (!description.trim()) next.description = F.description.errorKey!
    if (!categoryKey) next.category = F.category.errorKey!
    const min = budgetMin ? Number(budgetMin) : null
    const max = budgetMax ? Number(budgetMax) : null
    if (min !== null && Number.isNaN(min)) next.budgetMin = F.budgetMin.errorKey!
    if (max !== null && Number.isNaN(max)) next.budgetMax = F.budgetMax.errorKey!
    if (min !== null && max !== null && min > max) next.budgetMax = F.budgetMax.rangeErrorKey!
    return next
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0 || !categoryKey) return
    postJob.mutate({
      title: title.trim(),
      description: description.trim(),
      categoryKey,
      locationText: location.trim() || undefined,
      state: jobState || undefined,
      budgetMin: budgetMin ? Number(budgetMin) : undefined,
      budgetMax: budgetMax ? Number(budgetMax) : undefined,
      preferredDate: preferredDate || undefined,
    })
  }

  const meterBudget = (() => {
    const raw = budgetMax || budgetMin
    if (!raw) return null
    const n = Number(raw)
    return Number.isNaN(n) ? null : n
  })()

  return (
    <DashboardShell>
      <main className="space-y-6 bg-paper p-4 md:p-6">
        {/* Banner */}
        <section className="relative overflow-hidden rounded-3xl border-2 border-ink bg-banner p-6 shadow-standard">
          <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex max-w-2xl flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-xl uppercase tracking-tight text-ink md:text-2xl">
                  {t('postJob.bannerTitle')}
                </span>
                <span className="rotate-2 font-hand text-xl leading-none text-red">
                  {t('postJob.bannerHint')}
                </span>
              </div>
              <p className="text-sm font-medium text-ink/70">{t('postJob.bannerBody')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cx(
                    'flex items-center gap-1 rounded-full border-2 border-ink px-4 py-2 text-[11px] font-extrabold shadow-small',
                    step === 1 ? 'bg-red text-white' : 'bg-white text-ink opacity-90',
                  )}
                >
                  <Icon name={step === 1 ? 'check' : step === 2 ? 'clock' : 'shield-check'} size={16} />
                  {t(`postJob.step${step}`)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full items-start">
          {/* Form card */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-6 lg:col-span-8"
          >
            <div className="flex flex-col gap-6 rounded-3xl border-2 border-ink bg-white p-6 shadow-window">
              <div className="flex flex-col gap-2">
                <SectionLabel icon="hammer" hint={t('postJob.secCategoryHint')}>
                  {t('postJob.secCategory')}
                </SectionLabel>
                <CategoryPicker
                  categories={categories.data ?? []}
                  value={categoryKey}
                  onChange={setCategoryKey}
                  disabled={postJob.isPending}
                />
                <FieldError error={errors.category} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="job-title"
                  className="text-sm font-extrabold uppercase tracking-wide text-ink"
                >
                  {t('postJob.secTitle')}
                </label>
                <div className="relative">
                  <input
                    id="job-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('postJob.titlePh')}
                    aria-invalid={errors.title ? true : undefined}
                    className={cx(
                      'w-full rounded-2xl border-2 border-ink bg-paper px-4 py-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/40 focus:bg-white focus:shadow-small',
                      errors.title && 'border-red',
                    )}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-hand text-lg leading-none text-red">
                    {t('postJob.titleHint')}
                  </span>
                </div>
                <FieldError error={errors.title} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="job-gist"
                  className="text-sm font-extrabold uppercase tracking-wide text-ink"
                >
                  {t('postJob.secGist')}
                </label>
                <textarea
                  id="job-gist"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('postJob.gistPh')}
                  aria-invalid={errors.description ? true : undefined}
                  className={cx(
                    'w-full resize-none rounded-2xl border-2 border-ink bg-paper p-4 text-sm font-medium text-ink outline-none transition placeholder:text-ink/40 focus:bg-white focus:shadow-small',
                    errors.description && 'border-red',
                  )}
                />
                <FieldError error={errors.description} />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-extrabold uppercase tracking-wide text-ink">
                  {t('postJob.secUrgency')}
                </span>
                <UrgencyPicker value={urgency} onChange={pickUrgency} disabled={postJob.isPending} />
                {urgency === 'schedule' && (
                  <label className="field mt-1">
                    <span className="field__label">{t(F.preferredDate.labelKey)}</span>
                    <input
                      type="date"
                      className="input"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-extrabold uppercase tracking-wide text-ink">
                  {t('postJob.secLocation')}
                </span>
                <ZonePicker value={location} onChange={setLocation} disabled={postJob.isPending} />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="field">
                    <span className="field__label">{t('auth.state')}</span>
                    <select
                      className="input"
                      value={jobState}
                      onChange={(e) => setJobState(e.target.value)}
                    >
                      <option value="">{t('auth.selectState')}</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s.state} value={s.state}>
                          {s.state}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <input
                      type="text"
                      className="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('postJob.locationPh')}
                      aria-label={t('postJob.secLocation')}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <label className="text-sm font-extrabold uppercase tracking-wide text-ink">
                    {t('postJob.secBudget')}
                  </label>
                  <span className="font-hand text-lg leading-none text-yellow-dark">
                    {t('postJob.budgetNote')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg text-red">
                      ₦
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      placeholder={t('postJob.budgetPh')}
                      aria-invalid={errors.budgetMax ? true : undefined}
                      className={cx(
                        'w-full rounded-2xl border-2 border-ink bg-paper py-3 pl-10 pr-4 font-display text-lg text-ink outline-none transition placeholder:text-ink/30 focus:bg-white focus:shadow-small',
                        errors.budgetMax && 'border-red',
                      )}
                    />
                  </div>
                  <span className="hidden whitespace-nowrap rounded-2xl border-2 border-ink bg-banner px-4 py-3 text-[11px] font-extrabold uppercase shadow-small sm:inline-block">
                    {t('postJob.fixedBid')}
                  </span>
                </div>
                <FieldError error={errors.budgetMax} />
                <div className="grid grid-cols-1 gap-3">
                  <label className="field">
                    <span className="field__label">{t(F.budgetMin.labelKey)}</span>
                    <input
                      type="number"
                      min={0}
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      aria-invalid={errors.budgetMin ? true : undefined}
                      className={cx('input', errors.budgetMin && 'border-red')}
                    />
                    <FieldError error={errors.budgetMin} />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit bar */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-ink bg-white p-6 shadow-standard sm:flex-row">
              <p className="max-w-xs text-xs font-medium text-ink/50">{t('postJob.submitHint')}</p>
              <button
                type="submit"
                disabled={postJob.isPending}
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-banner px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95 disabled:opacity-60 sm:w-auto sm:flex-1 sm:max-w-md"
              >
                <Icon name="send" size={22} className="text-red" />
                {postJob.isPending ? t('postJob.posting') : t('postJob.submitLong')}
              </button>
            </div>
          </form>

          {/* Right rail */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <PriceRadar budget={meterBudget} categoryKey={categoryKey} />
            <NearbyPros categoryKey={categoryKey} />
            <div className="flex rotate-[0.4deg] flex-col gap-3 rounded-3xl border-2 border-ink bg-candy p-6 shadow-standard">
              <div className="flex items-center gap-2">
                <Icon name="shield-check" size={28} className="text-red" />
                <span className="font-display text-lg text-ink">{t('postJob.escrowTitle')}</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-ink/80">{t('postJob.escrowBody')}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">
                  {t('postJob.escrowFree')}
                </span>
                <span className="text-[11px] font-extrabold text-red">{t('postJob.escrowFreeTag')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  )
}
