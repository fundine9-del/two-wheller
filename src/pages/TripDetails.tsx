import { Link, Navigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Eyebrow from '../components/Eyebrow'
import { ArrowRight, CalendarDays, MapPin, Mountain, Users } from '../icons'
import { cover, fmt } from '../types'
import { WHATSAPP_URL } from '../lib/supabase'

export default function TripDetails() {
  const { trips } = useApp()
  const { id } = useParams()
  const chosen = trips.find((t) => t.id === id)

  if (!chosen) return <Navigate to="/trips" replace />

  return (
    <>
      <section className="max-w-[820px] px-[12%] pb-[45px] pt-[70px]">
        <Link to="/trips" className="mb-6 block bg-transparent text-amber">
          ← All trips
        </Link>
        <Eyebrow>{chosen.status === 'upcoming' ? 'UPCOMING RIDE' : 'RIDE ARCHIVE'}</Eyebrow>
        <h1 className="font-display text-[clamp(48px,7vw,87px)] font-extrabold leading-[0.88]">{chosen.title}</h1>
        <p className="text-[15px] leading-[1.65] text-silver">{chosen.description}</p>
        {chosen.status === 'upcoming' && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90"
          >
            Join this ride <ArrowRight size={16} />
          </a>
        )}
      </section>

      <section className="mx-auto grid max-w-[1200px] grid-cols-[1.2fr_1fr] items-start gap-14 px-[7%] pb-[70px] max-md:grid-cols-1">
        <div>
          <div
            className="grid h-[390px] place-items-center rounded-xl bg-slate bg-cover bg-center text-amber"
            style={cover(chosen.cover_image)}
          >
            {!chosen.cover_image && <Mountain size={70} />}
          </div>
        </div>
        <div>
          <h2 className="font-display text-[29px] font-extrabold">Ride details</h2>
          <dl>
            <div className="flex justify-between border-b border-slate py-3">
              <dt className="flex items-center gap-2 text-[13px] text-silver/70">
                <CalendarDays size={16} className="text-amber" /> Date
              </dt>
              <dd className="text-[13px] font-bold">{fmt(chosen.date)}</dd>
            </div>
            <div className="flex justify-between border-b border-slate py-3">
              <dt className="flex items-center gap-2 text-[13px] text-silver/70">
                <MapPin size={16} className="text-amber" /> Destination
              </dt>
              <dd className="text-[13px] font-bold">{chosen.location}</dd>
            </div>
            <div className="flex justify-between border-b border-slate py-3">
              <dt className="flex items-center gap-2 text-[13px] text-silver/70">
                <Users size={16} className="text-amber" /> Distance
              </dt>
              <dd className="text-[13px] font-bold">{chosen.distance}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}