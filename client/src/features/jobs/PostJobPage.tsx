import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { cx } from '@/lib/cx'
import { POST_JOB_FIELDS } from '@/config/postJobForm'
import { useCategories } from '@/features/home/hooks/useJobsQueries'
import { CategoryPicker } from './components/CategoryPicker'
import { usePostJob } from './hooks/useJobsMutations'
import { t } from 'i18next'

const F = POST_JOB_FIELDS

function FieldError({ error }: { error?: string }) {
  if (!error) return null
  return (
    <span role="alert" className="text-xs font-bold text-red">
      {t(error)}
    </span>
  )
}

/** Post a job (Workshop register form, spec §7.8) → detail page on success. */
export function PostJobPage() {
  const { t } = useTranslation()
  const categories = useCategories()
  const postJob = usePostJob()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryKey, setCategoryKey] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      budgetMin: budgetMin ? Number(budgetMin) : undefined,
      budgetMax: budgetMax ? Number(budgetMax) : undefined,
      preferredDate: preferredDate || undefined,
    })
  }

  return (
    <div className="mx-auto max-w-155">
      <div className="mb-5">
        <Link
          to="/"
          className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
        >
          {t('jobDetail.backHome')}
        </Link>
        <h1 className="mt-1 font-display text-3xl text-ink">{t('postJob.title')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('postJob.subtitle')}</p>
      </div>

      <Panel className="p-5 sm:p-8" tilt="tilt-5">
        <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span className="field__label">{t(F.title.labelKey)}</span>
            <input
              type="text"
              className={cx('input', errors.title && 'border-red')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={errors.title ? true : undefined}
            />
            <FieldError error={errors.title} />
          </label>

          <label className="field">
            <span className="field__label">{t(F.description.labelKey)}</span>
            <textarea
              className={cx('textarea', errors.description && 'border-red')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={errors.description ? true : undefined}
            />
            <FieldError error={errors.description} />
          </label>

          <div className="field">
            <span className="field__label">{t(F.category.labelKey)}</span>
            <CategoryPicker
              categories={categories.data ?? []}
              value={categoryKey}
              onChange={setCategoryKey}
              disabled={postJob.isPending}
            />
            <FieldError error={errors.category} />
          </div>

          <label className="field">
            <span className="field__label">{t(F.location.labelKey)}</span>
            <input
              type="text"
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="field">
              <span className="field__label">{t(F.budgetMin.labelKey)}</span>
              <input
                type="number"
                min={0}
                className={cx('input', errors.budgetMin && 'border-red')}
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                aria-invalid={errors.budgetMin ? true : undefined}
              />
              <FieldError error={errors.budgetMin} />
            </label>
            <label className="field">
              <span className="field__label">{t(F.budgetMax.labelKey)}</span>
              <input
                type="number"
                min={0}
                className={cx('input', errors.budgetMax && 'border-red')}
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                aria-invalid={errors.budgetMax ? true : undefined}
              />
              <FieldError error={errors.budgetMax} />
            </label>
          </div>

          <label className="field">
            <span className="field__label">{t(F.preferredDate.labelKey)}</span>
            <input
              type="date"
              className="input"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </label>

          <Button type="submit" disabled={postJob.isPending} className="mt-2 w-full">
            {postJob.isPending ? t('postJob.posting') : t('postJob.submit')}
          </Button>
        </form>
      </Panel>
    </div>
  )
}
