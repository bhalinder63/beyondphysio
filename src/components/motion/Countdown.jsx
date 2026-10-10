import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

function useNow() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

// Each digit rolls up when it changes
function Digit({ value }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.95em] overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 text-center"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown({ target }) {
  const now = useNow()
  const diff = target.getTime() - now
  if (diff <= 0) return null

  const s = Math.floor(diff / 1000)
  const units = [
    { label: 'Days', value: Math.floor(s / 86400) },
    { label: 'Hrs', value: Math.floor((s % 86400) / 3600) },
    { label: 'Min', value: Math.floor((s % 3600) / 60) },
    { label: 'Sec', value: s % 60 },
  ]

  return (
    <div role="timer" className="flex flex-wrap gap-2">
      <span className="sr-only">
        Starts in {units[0].value} days, {units[1].value} hours and {units[2].value} minutes
      </span>
      {units.map((u) => (
        <div key={u.label} aria-hidden="true" className="flex min-w-[76px] flex-col items-center border-2 border-brand px-3 py-3">
          <span className="flex font-wide text-[clamp(24px,3vw,36px)] leading-none font-black text-brand">
            {String(u.value)
              .padStart(2, '0')
              .split('')
              .map((d, i) => (
                <Digit key={i} value={d} />
              ))}
          </span>
          <span className="mt-2 text-[10px] leading-none font-extrabold tracking-[0.2em] text-muted uppercase">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
