import Eyebrow from '../components/Eyebrow'
import about from '../../about.webp'

export default function About() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-[1.2fr_1fr] items-start gap-14 px-[7%] pb-[70px] pt-[110px] max-md:grid-cols-1 max-md:gap-8 max-md:pt-[70px]">
      <div className="h-[360px] overflow-hidden rounded-xl">
        <img src={about} alt="Two Wheelers community" className="h-full w-full object-cover" />
      </div>
      <div>
        <Eyebrow>OUR STORY</Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
          Every rider has a reason.
        </h2>
        <p className="leading-[1.75] text-silver/70">
          Two Wheelers brings together people who see the road as more than a route. We share early starts, unexpected
          stops and the joy of getting there together.
        </p>
      </div>
    </section>
  )
}