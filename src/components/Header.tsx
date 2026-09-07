import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from '../icons'
import logo from '../../logo_converted.webp'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/trips', label: 'Trips' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-10 flex h-[82px] items-center gap-8 border-b border-slate bg-charcoal px-[7%]">
      <Link to="/" onClick={close} aria-label="The Two Wheelers home" className="block max-sm:h-[52px] max-sm:w-[88px] lg:w-[130px] lg:h-[66px]">
        <img className="h-[52px] w-[88px] object-contain lg:h-[66px] lg:w-[130px]" src={logo} alt="The Two Wheelers" />
      </Link>
      <nav
        className={`flex-1 max-lg:absolute max-lg:left-0 max-lg:right-0 max-lg:top-[69px] max-lg:flex-col max-lg:gap-0 max-lg:bg-charcoal max-lg:px-5 max-lg:py-3 lg:flex lg:gap-7 ${
          open ? 'max-lg:flex' : 'max-lg:hidden'
        }`}
      >
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={close}
            className={({ isActive }) =>
              `bg-transparent py-4 text-left text-sm max-lg:py-3 lg:py-7 ${isActive ? 'border-b-2 border-amber text-amber' : 'text-silver hover:text-amber'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="hidden border-l border-slate pl-5 text-[11px] text-silver lg:block">
        🏍{' '}
        <i className="not-italic">
          Fueled by Freedom •<br />
          Bound by Adventure
        </i>
      </div>
      <button
        className="ml-auto border-0 bg-transparent text-white lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}