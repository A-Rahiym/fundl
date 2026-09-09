import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Reveal } from '@/components/ui/Reveal'
import { cx } from '@/lib/cx'

interface Hub {
  name: string
  lat: number
  lng: number
  lead?: boolean
}

const HUBS: Hub[] = [
  { name: 'Kaduna', lat: 10.5227, lng: 7.4383, lead: true },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
  { name: 'Abuja', lat: 9.0579, lng: 7.4951 },
  { name: 'Port Harcourt', lat: 4.8156, lng: 7.0498 },
  { name: 'Kano', lat: 12.0022, lng: 8.5919 },
]

/**
 * Live coverage map: Leaflet on OpenStreetMap tiles, zoomed to Nigeria
 * with a pin on every hub (Kaduna emphasized). Scroll-wheel zoom stays
 * off so the page keeps scrolling; attribution retained per OSM license.
 */
export function CoverageMap() {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    })
    mapInstance.current = map

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const bounds = L.latLngBounds([])
    for (const hub of HUBS) {
      const point: L.LatLngExpression = [hub.lat, hub.lng]
      bounds.extend(point)
      L.circleMarker(point, {
        radius: hub.lead ? 10 : 7,
        color: '#1a1610',
        weight: 2,
        fillColor: hub.lead ? '#d33b2c' : '#f5b324',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(hub.name, { direction: 'top', offset: [0, -8] })
    }
    map.fitBounds(bounds.pad(0.25))

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  return (
    <section className="mx-auto w-full max-w-7xl px-4 tablet:px-8">
      <Reveal>
        <div className="mb-6 max-w-xl">
          <h2 className="text-balance font-display text-3xl uppercase tracking-tight sm:text-4xl">
            {t('landing:map.title')}
          </h2>
          <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{t('landing:map.sub')}</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="rounded-3xl border-[2.5px] border-ink bg-white p-4 shadow-window sm:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {HUBS.map((hub) => (
              <span
                key={hub.name}
                className={cx(
                  'rounded-full border-2 border-ink px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider shadow-small',
                  hub.lead ? 'bg-sun text-ink' : 'bg-paper text-ink/70',
                )}
              >
                {hub.name}
              </span>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper">
            <div ref={mapRef} className="z-0 h-64 w-full sm:h-80" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
