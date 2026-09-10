import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { coordsOf } from '@/config/nigeria'

export interface ResultPin {
  id: string
  userId: string
  name: string
  state: string | null | undefined
}

const NIGERIA_VIEW: [number, number] = [9.08, 8.67]

/** Deterministic per-id offset so same-state pins don't stack exactly. */
function jitter(seed: string, index: number): number {
  let hash = index * 2654435761
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return ((hash % 100) / 100 - 0.5) * 0.6
}

/**
 * Search-results map: one pin per artisan with a known state, at the
 * state centroid plus a small deterministic offset. Stateless artisans
 * stay in the list but don't pin. Scroll-wheel zoom stays off.
 */
export function ResultsMap({ artisans }: { artisans: ResultPin[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const map = L.map(mapRef.current, { scrollWheelZoom: false, attributionControl: true })
    mapInstance.current = map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    layerRef.current = L.layerGroup().addTo(map)
    map.setView(NIGERIA_VIEW, 6)
    return () => {
      map.remove()
      mapInstance.current = null
      layerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapInstance.current
    const layer = layerRef.current
    if (!map || !layer) return
    layer.clearLayers()
    const bounds = L.latLngBounds([])
    let pinned = 0
    artisans.forEach((a, i) => {
      const coords = coordsOf(a.state)
      if (!coords) return
      const point: L.LatLngExpression = [coords[0] + jitter(a.id, i), coords[1] + jitter(a.userId, i)];
      bounds.extend(point)
      pinned += 1
      L.circleMarker(point, {
        radius: 7,
        color: '#1a1610',
        weight: 2,
        fillColor: '#1e4d8c',
        fillOpacity: 1,
      })
        .addTo(layer)
        .bindTooltip(a.name, { direction: 'top', offset: [0, -8] })
        .bindPopup(`<a href="/app/artisans/${a.userId}">${a.name}</a>`);
    })
    if (pinned > 0) map.fitBounds(bounds.pad(0.6))
    else map.setView(NIGERIA_VIEW, 6)
  }, [artisans])

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper">
      <div ref={mapRef} className="z-0 h-64 w-full sm:h-80" />
    </div>
  )
}
