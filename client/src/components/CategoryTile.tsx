import { Icon } from './icons'
import type { IconName } from './icons'
import { Panel } from './Panel'
import { categoryColorFor, tiltFor, textOn } from '../lib/theme'
import { cx } from '../lib/cx'

export interface CategoryTileProps {
  index: number
  icon: IconName
  name: string
  count: string
}

/**
 * Category signboard tile (§7.4). Flat saturated color cycling so no two
 * adjacent tiles match (§2.2); hover snaps rotation toward 0° and lifts.
 */
export function CategoryTile({ index, icon, name, count }: CategoryTileProps) {
  const color = categoryColorFor(index)
  return (
    <Panel
      inset
      lift
      tilt={tiltFor(index)}
      className={cx(
        color,
        textOn(color),
        'flex aspect-square w-full flex-col items-center justify-center gap-2 p-4 text-center',
      )}
    >
      <Icon name={icon} size={34} className="stroke-current" />
      <span className="font-display text-base leading-tight">{name}</span>
      <span className="font-hand text-[17px] leading-none opacity-90">{count}</span>
    </Panel>
  )
}
