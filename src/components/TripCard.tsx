import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, MapPin, Mountain, Users } from '../icons'
import { cover, fmt } from '../types'
import type { Trip } from '../types'

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate bg-slate/30">
      <div
        className="relative grid h-[205px] place-items-center bg-slate bg-cover bg-center text-amber"
        style={cover(trip.cover_image)}
      >
        {!trip.cover_image && <Mountain size={42} />}
        <span className="absolute left-3 top-3 rounded border border-silver/40 bg-charcoal/80 px-1.5 py-1 text-[9px] font-extrabold text-silver">
          {trip.status === 'upcoming' ? 'UPCOMING' : 'RIDE ARCHIVE'}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-3 text-xl font-bold text-white">{trip.title}</h3>
        <p className="my-1.5 flex items-center gap-2 text-xs text-silver">
          <CalendarDays size={15} className="text-amber" /> {fmt(trip.date)}
        </p>
        <p className="my-1.5 flex items-center gap-2 text-xs text-silver">
          <MapPin size={15} className="text-amber" /> {trip.location}
        </p>
        <p className="my-1.5 flex items-center gap-2 text-xs text-silver">
          <Users size={15} className="text-amber" /> {trip.distance}
        </p>
        <p className="text-xs leading-relaxed text-silver/70">{trip.description}</p>
        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-2 text-silver/70">
            <Users size={16} className="text-amber" /> {trip.ride_type}
          </span>
          <Link
            to={`/trips/${trip.id}`}
            className="inline-flex items-center gap-2.5 rounded border border-amber px-3 py-2 text-white hover:bg-amber/10"
          >
            View details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}