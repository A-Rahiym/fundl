import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/icons'

export interface Crumb {
  label: string
  to?: string
}

/**
 * Depth breadcrumb (e.g. Hire > Musa): linked ancestors with a back
 * chevron, current page as plain text. Shows how deep the user is from
 * the root screen for easy back-navigation.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
      <Link
        to={trail[0]?.to ?? '/app'}
        aria-label="Back"
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white shadow-small transition hover:bg-paper"
      >
        <Icon name="chevron-right" size={16} className="-scale-x-100" />
      </Link>
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1
        return (
          <Fragment key={`${crumb.label}-${i}`}>
            {i > 0 && <Icon name="chevron-right" size={14} className="text-ink/40" aria-hidden="true" />}
            {last || !crumb.to ? (
              <span aria-current={last ? 'page' : undefined} className="max-w-[220px] truncate text-xs font-extrabold uppercase tracking-wider text-ink">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="text-xs font-bold uppercase tracking-wider text-ink/50 underline decoration-2 underline-offset-2 hover:text-ink"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
