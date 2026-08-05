import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCategories, useJobs } from './hooks/useJobsQueries'
import { FilterBar } from './components/FilterBar'
import { JobList } from './components/JobList'

/** Signed-in home: the job feed with search + trade filter. */
export function HomePage() {
  const { t, i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const categories = useCategories().data
  const jobs = useJobs()

  const filtered = useMemo(() => {
    const list = jobs.data ?? []
    const q = query.trim().toLowerCase()
    return list.filter((job) => {
      if (category && job.category?.key !== category) return false
      if (!q) return true
      const categoryName = t(`categories:${job.category?.key ?? ''}`).toLowerCase()
      return (
        (job.title ?? '').toLowerCase().includes(q) ||
        (job.description ?? '').toLowerCase().includes(q) ||
        categoryName.includes(q)
      )
    })
  }, [jobs.data, query, category, t])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-3xl text-ink">{t('home.title')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('home.subtitle')}</p>
      </div>

      <FilterBar
        categories={categories ?? []}
        selected={category}
        onSelect={setCategory}
        query={query}
        onQuery={setQuery}
      />

      <JobList
        jobs={filtered}
        loading={jobs.isLoading}
        error={jobs.isError}
        onRetry={() => jobs.refetch()}
        language={i18n.language}
      />
    </div>
  )
}
