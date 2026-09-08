import Eyebrow from '../components/Eyebrow'
import { ArrowRight } from '../icons'
import { WHATSAPP_URL } from '../lib/supabase'
import logo from '../../logo_converted.webp'

export default function Contact() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-[1.2fr_1fr] items-start gap-14 px-[7%] pb-[70px] pt-[110px] max-md:grid-cols-1 max-md:gap-8 max-md:pt-[70px]">
      <div>
        <Eyebrow>LET'S RIDE</Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">The road is calling.</h2>
        <p className="mt-2 leading-[1.75] text-silver/70">Have a question, a route idea or want to join the community?</p>
        <p className="mt-4 font-bold text-white">hello@twowheelers.com</p>
        <p className="mb-8 font-bold text-white">Nairobi, Kenya</p>

        <article className="mt-8 grid min-w-[calc(100%-0px)] grid-cols-[120px_1fr] items-center gap-5 rounded-lg border border-slate bg-slate/30 p-4 max-sm:grid-cols-1">
          <img src={logo} alt="The Two Wheelers" className="h-[100px] w-[120px] object-contain max-sm:w-full" />
          <div>
            <Eyebrow>RIDE WITH US</Eyebrow>
            <h3 className="mb-2 text-lg font-bold text-white">Join the WhatsApp group</h3>
            <p className="mb-4 text-sm leading-relaxed text-silver/70">
              Meet fellow riders, get ride updates and stay connected with the community.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90"
            >
              Join WhatsApp group <ArrowRight size={16} />
            </a>
          </div>
        </article>
      </div>

      
    </section>
  )
}