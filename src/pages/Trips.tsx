import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import TripCard from '../components/TripCard'
import Eyebrow from '../components/Eyebrow'
import { Mountain, Search } from '../icons'

const filters = [
  { value: 'all', label: 'All trips' },
  { value: 'upcoming', label: 'Upcoming trips' },
  { value: 'past', label: 'Ride archive' },
]

export default function Trips() {
  const { trips } = useApp()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const shown = useMemo(
    () =>
      trips.filter(
        (t) =>
          (filter === 'all' || t.status === filter) &&
          `${t.title} ${t.location}`.toLowerCase().includes(query.toLowerCase())
      ),
    [trips, filter, query]
  )

  return (
    <>
      <section className="max-w-[820px] px-[12%] py-[70px]">
        <Eyebrow>
          <Mountain size={16} /> OUR JOURNEYS
        </Eyebrow>
        <h1 className="font-display text-[clamp(48px,7vw,87px)] font-extrabold uppercase leading-[0.88]">
          TRIP <em className="not-italic text-amber">HISTORY</em>
        </h1>
        <p className="text-[15px] leading-[1.65] text-silver">
          Different roads. Same passion. Explore the journeys we have shared as a brotherhood.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-[7%] py-[70px]">
        <div className="mb-8 flex gap-5 max-md:flex-col">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="min-w-[180px] rounded-lg border border-slate bg-slate px-4 py-3.5 text-silver outline-none"
          >
            {filters.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <label className="flex flex-1 items-center gap-2.5 rounded-lg border border-slate bg-slate px-4 text-silver">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search trips..."
              className="w-full bg-transparent py-3.5 text-silver outline-none placeholder:text-silver/50"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {shown.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </>
  )
}