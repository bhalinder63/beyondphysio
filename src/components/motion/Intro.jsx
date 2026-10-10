import { useEffect } from 'react'
import { motion } from 'motion/react'
import { ease } from './primitives.jsx'

const word = 'BEYOND'

// Brief branded curtain shown on load; the parent unmounts it (inside AnimatePresence) to play the exit
export default function Intro({ onDone }) {
  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden')
    const id = setTimeout(onDone, 1500)
    return () => {
      clearTimeout(id)
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-ink text-brand"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex overflow-hidden font-display text-[clamp(72px,18vw,220px)] leading-[0.9] uppercase">
        {word.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="text-sm font-extrabold tracking-[0.6em] text-white uppercase"
        initial={{ opacity: 0, letterSpacing: '1.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.6em' }}
        transition={{ duration: 0.9, ease, delay: 0.55 }}
      >
        Physio community
      </motion.div>
      <motion.span
        className="absolute bottom-0 left-0 h-1.5 w-full origin-left bg-brand"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
