import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <p
      className={`mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-amber ${className}`}
    >
      {children}
    </p>
  )
}