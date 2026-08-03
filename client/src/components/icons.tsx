import type { ReactNode } from 'react'

/**
 * FUNDI custom line-icon set (design spec §4).
 * Single 1.8px stroke, rounded join, deliberately "slightly off" —
 * no generic icon font allowed next to Alfa Slab One headlines.
 */

export type IconName =
  /* category tool icons */
  | 'hammer'
  | 'wrench'
  | 'bolt'
  | 'needle'
  | 'roller'
  | 'trowel'
  /* system icons */
  | 'search'
  | 'filter'
  | 'bell'
  | 'chat'
  | 'star'
  | 'pin'
  | 'upload'
  | 'check'
  | 'close'
  | 'plus'
  | 'home'
  | 'user'
  | 'clock'
  | 'mail'
  | 'eye'
  | 'chevron-right'
  | 'menu'
  /* stamps & badges */
  | 'flame'
  | 'shield-check'

const PATHS: Record<IconName, ReactNode> = {
  /* ----- category tools ----- */
  hammer: (
    <>
      <path d="M13.5 20.5 9 10.5" />
      <g transform="rotate(-45 9 8.5)">
        <rect x="3.8" y="7" width="10.5" height="3.5" rx="1.4" />
        <path d="M6.5 10.5 4 13.5" />
      </g>
    </>
  ),
  wrench: (
    <path d="M14.7 3.6a4.9 4.9 0 0 0-4.6 7.2L4 17.1a2.1 2.1 0 0 0 3 3l6.3-6.1a4.9 4.9 0 0 0 7.3-4.5l-2.9 2.9-2.4-.5-.5-2.4z" />
  ),
  bolt: (
    <>
      <rect x="3.5" y="2.5" width="17" height="19" rx="3.2" />
      <path d="M13.7 6.4 9.2 13h2.9l-1.4 4.6L15 11h-2.9z" />
    </>
  ),
  needle: (
    <>
      <path d="M3.5 20.5c2.2-3 5.6-8.5 7.2-11.5 1-2 2.6-3.2 4.6-3.2" />
      <path d="M5 20.5l1.5-1.5 12-12" />
      <path d="M18.5 6.8l.4-.5 1.6 1.6-.4.5z" />
    </>
  ),
  roller: (
    <>
      <path d="M9.5 3h5v5.5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z" />
      <path d="M12 10.5v4" />
      <path d="M9.5 14.5h5l1.2 4.5H8.3z" />
      <path d="M9.7 19c-.7 1.2-1 1.8-1 2.4" />
    </>
  ),
  trowel: (
    <>
      <path d="M13 10.5 20.5 3.5" />
      <path d="m13 10.5-5 5-2.8-2.8 5-5z" />
      <path d="M3.5 20.5h17M3.5 18h11" />
    </>
  ),

  /* ----- system icons ----- */
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.6 15.6 4.6 4.6" />
    </>
  ),
  filter: <path d="M4 5.5h16l-6.2 7v5.5l-3.6 2v-7.5z" />,
  bell: (
    <>
      <path d="M6 16.5c0-3.2 1-5.6 1.5-7.1.8-2.4 2.2-3.6 4.5-3.6s3.7 1.2 4.5 3.6c.5 1.5 1.5 3.9 1.5 7.1" />
      <path d="M4.5 16.5h15" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  chat: (
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-9L5.5 20v-4h-.9A1.5 1.5 0 0 1 4 14.5z" />
  ),
  star: <path d="m12 3.2 2.7 5.6 6.2.9-4.5 4.3 1.1 6.1L12 17.2 6.5 20.1l1.1-6.1L3 9.7l6.2-.9z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15.5v-10M12 5.5 8 9.5M12 5.5l4 4" />
      <path d="M4 15v3.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.5 20.5v-5.5h5v5.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1-4.2 3.9-6.2 7-6.2s6 2 7 6.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.8v4.6l3.2 1.9" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </>
  ),
  eye: (
    <>
      <path d="M3.5 12s3.2-5.2 8.5-5.2 8.5 5.2 8.5 5.2-3.2 5.2-8.5 5.2S3.5 12 3.5 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  'chevron-right': <path d="m9 5.5 6.5 6.5L9 18.5" />,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,

  /* ----- stamps & badges ----- */
  flame: (
    <path d="M12 3c2.5 3.2 5 5.7 5 9a5 5 0 0 1-10 0c0-1.5.7-2.8 1.6-4 .3 1 .8 1.7 1.6 2.3-.5-2.2.3-4.7 1.8-7.3z" />
  ),
  'shield-check': (
    <>
      <path d="M12 3l7 2.6v5.4c0 4.5-3 8.1-7 9.5-4-1.4-7-5-7-9.5V5.6z" />
      <path d="m8.5 12 2.5 2.5 4.5-4.5" />
    </>
  ),
}

export interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
}

export function Icon({ name, size = 24, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
