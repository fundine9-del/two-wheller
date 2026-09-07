import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }
const icon = (symbol: string, arrow = false) => ({ size = 20, ...props }: Props) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{arrow && <path d="M3 12h18M13 5l7 7-7 7"/>}{symbol && <text x="12" y="15" textAnchor="middle" stroke="none" fill="currentColor" fontSize="8" fontWeight="bold">{symbol}</text>}</svg>
export const ArrowRight=icon('', true), CalendarDays=icon('□'), ChevronRight=icon('›'), Clock3=icon('◷'), Facebook=icon('f'), Image=icon('▧'), Instagram=icon('◎'), MapPin=icon('•'), Menu=icon('☰'), Mountain=icon('⌁'), Search=icon('⌕'), Users=icon('♙'), X=icon('×')
