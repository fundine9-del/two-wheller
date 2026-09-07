import { Link, useLocation } from 'react-router-dom'
import { Mountain } from '../icons'

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="border-t border-slate bg-charcoal px-5 py-11 text-center text-silver">
      <div className="flex items-center justify-center gap-2 text-[12px] font-extrabold tracking-widest text-white">
        <Mountain size={23} className="text-amber" />
        <span>THE TWO WHEELERS</span>
      </div>
      <p className="my-2.5 mb-6 text-xs tracking-wide">More Rides &nbsp;•&nbsp; More Stories &nbsp;•&nbsp; Together</p>
      {pathname === '/contact' && (
        <Link to="/login" className="mx-auto mb-5 block text-[11px] font-extrabold text-amber underline underline-offset-4">
          Admin login
        </Link>
      )}
      <small className="text-[10px]">© 2026 The Two Wheelers. Ride safe, ride together.</small>
    </footer>
  )
}