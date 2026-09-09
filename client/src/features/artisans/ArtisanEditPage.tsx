import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { CategoryPicker } from '@/components/CategoryPicker'
import { useCategories } from '@/features/home/hooks/useJobsQueries'
import { useArtisanMe } from './hooks/useArtisansQueries'
import {
  useAddPortfolio,
  useRemovePortfolio,
  useUpdateArtisanProfile,
} from './hooks/useArtisansMutations'
import { FALLBACK_CATEGORIES } from '@/config/categories'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'
import { ApiError } from '@/lib/api'
import type { ApiArtisanProfile } from '@/lib/api'

const RATE_TYPES = ['hourly', 'fixed', 'negotiable'] as const

function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function ProfileForm({ initial }: { initial: ApiArtisanProfile | null }) {
  const { t } = useTranslation()
  const update = useUpdateArtisanProfile()
  const categories = useCategories()

  const [name, setName] = useState(initial?.user?.name ?? '')
  const [phone, setPhone] = useState(initial?.user?.phone ?? '')
  const [location, setLocation] = useState(initial?.user?.locationText ?? '')
  const [bio, setBio] = useState(initial?.bio ?? '')
  const [categoryKey, setCategoryKey] = useState<string | null>(initial?.category?.key ?? null)
  const [rateType, setRateType] = useState<(typeof RATE_TYPES)[number]>(
    initial?.rateType ?? 'negotiable',
  )
  const [rateAmount, setRateAmount] = useState(
    initial?.rateAmount != null ? String(initial.rateAmount) : '',
  )
  const [isAvailable, setIsAvailable] = useState(initial?.isAvailable ?? true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (name.trim() && name.trim().length < 2) next.name = 'artisan.edit.errName'
    if (bio.length > 1000) next.bio = 'artisan.edit.errBio'
    const amount = rateAmount ? Number(rateAmount) : null
    if (amount !== null && !(amount > 0)) next.rate = 'artisan.edit.errRate'
    if (!categoryKey) next.category = 'postJob.errCategory'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    update.mutate({
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      locationText: location.trim() || undefined,
      bio: bio.trim() || undefined,
      categoryKey: categoryKey!,
      rateType,
      rateAmount: amount ?? undefined,
      isAvailable,
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="field">
          <span className="field__label">{t('artisan.edit.name')}</span>
          <input
            type="text"
            className={cx('input', errors.name && 'border-red')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && (
            <span role="alert" className="text-xs font-bold text-red">
              {t(errors.name)}
            </span>
          )}
        </label>
        <label className="field">
          <span className="field__label">{t('artisan.edit.phone')}</span>
          <input
            type="tel"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span className="field__label">{t('artisan.edit.location')}</span>
        <input
          type="text"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <label className="field">
        <span className="field__label">{t('artisan.edit.bio')}</span>
        <textarea
          rows={4}
          className={cx('textarea', errors.bio && 'border-red')}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          aria-invalid={errors.bio ? true : undefined}
        />
        {errors.bio && (
          <span role="alert" className="text-xs font-bold text-red">
            {t(errors.bio)}
          </span>
        )}
      </label>

      <div className="field">
        <span className="field__label">{t('artisan.edit.category')}</span>
        <CategoryPicker
          categories={categories.data ?? FALLBACK_CATEGORIES}
          value={categoryKey}
          onChange={setCategoryKey}
          disabled={update.isPending}
        />
        {errors.category && (
          <span role="alert" className="text-xs font-bold text-red">
            {t(errors.category)}
          </span>
        )}
      </div>

      <div className="field">
        <span className="field__label">{t('artisan.edit.rateType')}</span>
        <div className="flex flex-wrap gap-2">
          {RATE_TYPES.map((rt) => (
            <button
              key={rt}
              type="button"
              onClick={() => setRateType(rt)}
              aria-pressed={rateType === rt}
              className={cx(
                'rounded-full border-2 border-ink px-4 py-2 text-xs font-extrabold uppercase shadow-small transition',
                rateType === rt ? 'bg-sun text-ink' : 'bg-white text-ink/60 hover:bg-paper hover:text-ink',
              )}
            >
              {t(`rateType.${rt}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="field">
          <span className="field__label">{t('artisan.edit.rateAmount')}</span>
          <input
            type="number"
            min={0}
            className={cx('input', errors.rate && 'border-red')}
            value={rateAmount}
            onChange={(e) => setRateAmount(e.target.value)}
            aria-invalid={errors.rate ? true : undefined}
          />
          {errors.rate && (
            <span role="alert" className="text-xs font-bold text-red">
              {t(errors.rate)}
            </span>
          )}
        </label>
        <div className="field">
          <span className="field__label">{t('artisan.edit.available')}</span>
          <div className="flex gap-2">
            {([true, false] as const).map((v) => (
              <button
                key={String(v)}
                type="button"
                onClick={() => setIsAvailable(v)}
                aria-pressed={isAvailable === v}
                className={cx(
                  'flex-1 rounded-full border-2 border-ink px-4 py-2 text-xs font-extrabold uppercase shadow-small transition',
                  isAvailable === v ? 'bg-mint text-ink' : 'bg-white text-ink/60 hover:bg-paper hover:text-ink',
                )}
              >
                {t(v ? 'badge.available' : 'badge.booked')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={update.isPending}
        className="rounded-full border-2 border-ink bg-sun px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95 disabled:opacity-60"
      >
        {update.isPending ? t('artisan.edit.saving') : t('artisan.edit.save')}
      </button>
    </form>
  )
}

function PortfolioSection({ profile }: { profile: ApiArtisanProfile }) {
  const { t } = useTranslation()
  const add = useAddPortfolio()
  const remove = useRemovePortfolio()
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidUrl(imageUrl.trim())) {
      setError('artisan.edit.errUrl')
      return
    }
    if (caption.length > 300) {
      setError('artisan.edit.errCaption')
      return
    }
    setError(null)
    add.mutate(
      { imageUrl: imageUrl.trim(), caption: caption.trim() || undefined },
      {
        onSuccess: () => {
          setImageUrl('')
          setCaption('')
        },
      },
    )
  }

  return (
    <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard sm:p-8">
      <h2 className="font-display text-lg text-ink">{t('artisan.edit.portfolio')}</h2>
      {(profile.portfolio ?? []).length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {profile.portfolio!.map((image) => (
            <figure key={image.id} className="relative overflow-hidden rounded-2xl border-2 border-ink">
              <img src={image.imageUrl} alt={image.caption ?? ''} loading="lazy" className="aspect-square w-full object-cover" />
              <button
                type="button"
                disabled={remove.isPending || !image.id}
                onClick={() => image.id && remove.mutate(image.id)}
                aria-label={t('artisan.edit.remove')}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white shadow-small transition hover:bg-rose disabled:opacity-60"
              >
                <Icon name="close" size={14} />
              </button>
              {image.caption && (
                <figcaption className="px-2 py-1 text-xs font-medium text-ink/70">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      <form onSubmit={onAdd} noValidate className="mt-4 flex flex-col gap-3 border-t-2 border-ink/10 pt-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="field">
            <span className="field__label">{t('artisan.edit.imageUrl')}</span>
            <input
              type="url"
              className={cx('input', error && 'border-red')}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…"
            />
          </label>
          <label className="field">
            <span className="field__label">{t('artisan.edit.caption')}</span>
            <input
              type="text"
              className="input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={300}
            />
          </label>
        </div>
        {error && (
          <span role="alert" className="text-xs font-bold text-red">
            {t(error)}
          </span>
        )}
        <button
          type="submit"
          disabled={add.isPending}
          className="self-start rounded-full border-2 border-ink bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider shadow-small transition hover:bg-paper disabled:opacity-60"
        >
          {add.isPending ? t('artisan.edit.saving') : t('artisan.edit.addPhoto')}
        </button>
      </form>
    </section>
  )
}

/** Artisan self-service profile editor (creates the profile on first save). */
export function ArtisanEditPage() {
  const { t } = useTranslation()
  const me = useArtisanMe()

  // 404 = no profile yet → blank create form. Any other error is real.
  const notFound = (me.error as ApiError | null)?.status === 404
  const showForm = !me.isLoading && (!me.isError || notFound)

  return (
    <DashboardShell>
      <main className="mx-auto w-full max-w-[760px] space-y-5 bg-paper p-4 md:p-6">
        <Breadcrumbs
          trail={[
            { label: t('nav.profile'), to: '/app/profile' },
            { label: t('artisan.edit.title') },
          ]}
        />
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-ink">
            {t('artisan.edit.title')}
          </h1>
          <p className="mt-1 text-sm font-medium text-ink/60">{t('artisan.edit.subtitle')}</p>
        </div>

        {me.isLoading && <LoadingState className="pt-10" />}
        {me.isError && !notFound && (
          <ErrorState title="artisan.notFound" retryLabel="home.retry" onRetry={() => me.refetch()} />
        )}
        {showForm && <ProfileForm key={me.data?.id ?? 'new'} initial={me.data ?? null} />}

        {!me.isLoading && me.data && <PortfolioSection profile={me.data} />}

        <p className="pb-2 text-center text-xs font-medium text-ink/40">
          <Link to="/app/profile" className="underline underline-offset-2 hover:text-ink">
            {t('jobDetail.backHome')}
          </Link>
        </p>
      </main>
    </DashboardShell>
  )
}
