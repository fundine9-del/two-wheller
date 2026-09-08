import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import TripCard from '../components/TripCard'
import Eyebrow from '../components/Eyebrow'
import { CalendarDays, Image, Mountain } from '../icons'
import { HERO_FALLBACK } from '../lib/supabase'

export default function Home() {
  const { trips, gallery, home } = useApp()
  const upcoming = trips.filter((t) => t.status === 'upcoming').slice(0, 2)
  const preview = gallery.slice(0, 6)

  return (
    <>
      <section
        className="flex min-h-[590px] items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(27,28,28,0.93) 20%, rgba(27,28,28,0.55) 55%, rgba(27,28,28,0.15)), url("${home?.hero_image || HERO_FALLBACK}")`,
        }}
      >
        <div className="max-w-[820px] px-[12%] py-[70px]">
          <Eyebrow>
            <Mountain size={16} /> {home?.hero_eyebrow || 'RIDE WITH PURPOSE'}
          </Eyebrow>
          <h1 className="mb-6 font-display text-[clamp(48px,7vw,87px)] font-extrabold uppercase leading-[0.88]">
            {(home?.hero_title || 'ONE ROAD.').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <em className="not-italic text-amber">{line}</em> : line}
              </span>
            ))}
          </h1>
          <p className="text-[15px] leading-relaxed text-silver">
            {home?.hero_subtitle || 'We ride to discover, connect and build memories beyond the miles.'}
          </p>
          <Link
            to="/trips"
            className="mt-5 inline-flex items-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90"
          >
            Explore our rides <Mountain size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[780px] px-[7%] py-[70px] text-center">
        <Eyebrow className="justify-center">THE COMMUNITY</Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
          Adventure feels better
          <br />
          when it is shared.
        </h2>
        <p className="leading-[1.75] text-silver/70">
          From Sunday morning escapes to unforgettable cross-country journeys, Two Wheelers is a community for riders
          who believe every turn has a story.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-[7%] pb-[70px]">
        <Eyebrow>
          <CalendarDays size={16} /> NEXT RIDES
        </Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
          Upcoming trips
        </h2>
        {upcoming.length ? (
          <div className="mt-8 grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {upcoming.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-silver/70">No upcoming trips yet. Check back soon.</p>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-[7%] pb-[70px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>
              <Image size={16} /> RIDE MEMORIES
            </Eyebrow>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              Moments from the road
            </h2>
          </div>
          <Link to="/gallery" className="mb-1 inline-flex items-center gap-2 text-[13px] font-extrabold text-amber hover:underline">
            View full highlights →
          </Link>
        </div>
        {preview.length ? (
          <div className="mt-8 grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {preview.map((photo) => (
              <figure
                key={photo.id}
                className="m-0 flex h-[282px] items-end rounded-lg bg-slate bg-cover bg-center p-4"
                style={{ backgroundImage: `url("${photo.image_url}")` }}
              >
                <figcaption className="text-xs font-bold text-white">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid min-h-[300px] place-content-center rounded-lg border border-dashed border-silver/30 text-center text-silver/70">
            <Image size={40} className="mx-auto text-amber" />
            <h3 className="mt-3 text-lg font-bold text-silver">Your ride highlights will appear here</h3>
            <p className="mt-1">Upload photos from the admin area and they display automatically.</p>
          </div>
        )}
      </section>
    </>
  )
}