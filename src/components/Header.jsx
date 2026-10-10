import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ease } from './motion/primitives.jsx'
import { gutter } from './ui.jsx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#what', label: 'What we do' },
  { href: '#community', label: 'Community' },
  { href: '#events', label: 'Events' },
]

export default function Header({ ready }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)
  const ref = useRef(null)
  const { scrollY } = useScroll()

  // Hide while scrolling down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160)
    setScrolled(y > 10)
  })

  // Expose the closed header's height so the hero can fill the rest of the first screen
  useEffect(() => {
    const el = ref.current
    const ro = new ResizeObserver(() => {
      if (!open) document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  const show = ready && (!hidden || open)

  return (
    <motion.header
      ref={ref}
      initial={{ y: '-100%' }}
      animate={{ y: show ? '0%' : '-110%' }}
      transition={{ duration: 0.6, ease }}
      className={`sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 bg-brand py-5 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_0_#080807]' : ''} ${gutter}`}
    >
      <a href="#top" className="group py-2 font-display text-[28px] leading-none uppercase no-underline">
        <span className="block overflow-hidden">
          <span className="relative block transition-transform duration-500 group-hover:-translate-y-full">
            BEYOND PHYSIO
            <span aria-hidden="true" className="absolute top-full left-0 block text-white">
              BEYOND PHYSIO
            </span>
          </span>
        </span>
      </a>

      <button
        type="button"
        className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`block h-1 w-7 bg-ink transition-transform duration-300 ${open ? 'translate-y-2.5 rotate-45' : ''}`} />
        <span className={`block h-1 w-7 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-1 w-7 bg-ink transition-transform duration-300 ${open ? '-translate-y-2.5 -rotate-45' : ''}`} />
      </button>

      <nav
        id="site-nav"
        className={`${open ? 'flex max-md:animate-menu-in' : 'hidden'} w-full flex-col items-stretch text-xs font-extrabold tracking-[0.14em] uppercase md:flex md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-x-7 md:gap-y-1`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            className="relative border-b-2 border-ink/20 py-3.5 no-underline after:absolute after:bottom-2.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 md:border-0"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#join"
          onClick={close}
          className="mt-4 bg-ink px-6 py-4 text-center text-brand no-underline transition-colors duration-300 hover:bg-white hover:text-ink md:mt-0"
        >
          Join
        </a>
      </nav>
    </motion.header>
  )
}
