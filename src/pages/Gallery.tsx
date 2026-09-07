import { useApp } from '../context/AppContext'
import Eyebrow from '../components/Eyebrow'
import { Image } from '../icons'

export default function Gallery() {
  const { gallery } = useApp()

  return (
    <>
      <section className="max-w-[820px] px-[12%] pb-[45px] pt-[70px]">
        <Eyebrow>
          <Image size={16} /> THROUGH OUR LENS
        </Eyebrow>
        <h1 className="font-display text-[clamp(48px,7vw,87px)] font-extrabold uppercase leading-[0.88]">
          RIDE <em className="not-italic text-amber">MEMORIES</em>
        </h1>
        <p className="text-[15px] leading-[1.65] text-silver">Every photo is a mile we will never forget.</p>
      </section>

      <section className="mx-auto grid max-w-[1200px] grid-cols-3 gap-4 px-[7%] py-[70px] max-md:grid-cols-2 max-sm:grid-cols-1">
        {gallery.length ? (
          gallery.map((photo) => (
            <figure
              key={photo.id}
              className="m-0 flex h-[306px] items-end rounded-lg bg-slate bg-cover bg-center p-4"
              style={{ backgroundImage: `url("${photo.image_url}")` }}
            >
              <figcaption className="text-xs font-bold text-white">{photo.caption}</figcaption>
            </figure>
          ))
        ) : (
          <div className="col-span-full grid min-h-[300px] place-content-center rounded-lg border border-dashed border-silver/30 text-center text-silver/70">
            <Image size={40} className="mx-auto text-amber" />
            <h3 className="mt-3 text-lg font-bold text-silver">Your ride gallery will appear here</h3>
            <p className="mt-1">Upload photos from the admin area and they display automatically.</p>
          </div>
        )}
      </section>
    </>
  )
}