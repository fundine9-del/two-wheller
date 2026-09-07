import type { CSSProperties } from 'react'

export type Trip = {
  id: string
  title: string
  date: string
  location: string
  distance: string
  description: string
  ride_type: string
  cover_image: string | null
  status: 'upcoming' | 'past'
}

export type Gallery = {
  id: string
  image_url: string
  caption: string | null
}

export type Home = {
  id: string
  hero_image: string | null
  hero_eyebrow: string | null
  hero_title: string | null
  hero_subtitle: string | null
}

export type AdminTab = 'home' | 'trips' | 'gallery'

export type Draft = Record<string, string>

export const fmt = (date: string): string =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(date + 'T12:00:00')
  )

export const readDraft = (name: string): Draft => {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(`two-wheelers-${name}-draft`) || '{}') as Draft
  } catch {
    return {}
  }
}

export const saveDraft = (name: string, field: string, value: string): void => {
  const draft = readDraft(name)
  localStorage.setItem(`two-wheelers-${name}-draft`, JSON.stringify({ ...draft, [field]: value }))
}

export const clearDraft = (name: string): void => {
  localStorage.removeItem(`two-wheelers-${name}-draft`)
}

export const cover = (src: string | null): CSSProperties | undefined =>
  src
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(27, 28, 28, 0.45), rgba(74, 83, 92, 0.15)), url("${src}")`,
      }
    : undefined

export const sample: Trip[] = [
  {
    id: 'sample-1',
    title: 'Ngong Hills Ride',
    date: '2026-10-18',
    location: 'Ngong Hills, Kajiado',
    distance: '120 km',
    description: 'A scenic ride with open views, fresh air and brotherhood vibes.',
    ride_type: 'Group Ride',
    cover_image: null,
    status: 'upcoming',
  },
  {
    id: 'sample-2',
    title: 'Geothermal Escape',
    date: '2026-09-27',
    location: 'Naivasha',
    distance: '110 km',
    description: 'Relax, recharge and enjoy the natural hot springs of Naivasha.',
    ride_type: 'Group Ride',
    cover_image: null,
    status: 'upcoming',
  },
]