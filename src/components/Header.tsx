import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from '../icons'
import logo from '../../logo_converted.webp'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/trips', label: 'Trips' },
  { to: '/gallery', label: 'Highlights' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-10 flex h-[100px] items-center gap-8 border-b border-slate bg-charcoal px-[7%] lg:h-[126px]">
      <Link to="/" onClick={close} aria-label="The Two Wheelers home" className="flex items-center gap-3">
        <img className="h-[78px] w-[132px] object-contain lg:h-[99px] lg:w-[195px]" src={logo} alt="The Two Wheelers" />
        <span className="font-display leading-none">
          <b className="block text-[19px] font-extrabold uppercase tracking-wide text-silver sm:text-2xl lg:text-[27px]">
            The Two Wheelers
          </b>
        </span>
      </Link>
      <nav
        className={`flex-1 max-lg:absolute max-lg:left-0 max-lg:right-0 max-lg:top-[100px] max-lg:flex-col max-lg:gap-0 max-lg:bg-charcoal max-lg:px-5 max-lg:py-3 lg:flex lg:gap-7 ${
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
        className="ml-auto flex h-16 w-16 items-center justify-center border-0 bg-transparent text-silver lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={60} /> : <Menu size={60} />}
      </button>
    </header>
  )
}