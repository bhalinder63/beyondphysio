import { motion, useReducedMotion } from 'motion/react'
import { useOpenJoin } from './join/JoinModal.jsx'
import { DrawLine, Magnetic, MaskReveal, Reveal, Stagger, fadeUp } from './motion/primitives.jsx'
import { Button, INSTAGRAM_HANDLE, INSTAGRAM_URL, gutter } from './ui.jsx'

// "bigger" letters bob in a looping wave once revealed
function WaveWord({ word }) {
  const reduce = useReducedMotion()
  return (
    <span className="text-white">
      <span className="sr-only">{word}</span>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          animate={reduce ? undefined : { y: ['0em', '-0.07em', '0em'] }}
          transition={{ duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2, delay: 1.2 + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Join() {
  const openJoin = useOpenJoin()
  const words = ['Be', 'part', 'of', 'something', <WaveWord word="bigger" />, 'than', 'yourself.']

  return (
    <section id="join" className={`flex flex-col items-center gap-8 pt-24 pb-12 text-center ${gutter}`}>
      {/* Hazard stripes; the inner strip is one stripe period wider and slides by exactly that period */}
      <div aria-hidden="true" className="relative h-6 w-full overflow-hidden">
        <div className="absolute inset-y-0 -left-[20.785px] right-0 animate-stripes bg-[repeating-linear-gradient(-60deg,#080807_0_8px,transparent_8px_18px)]" />
      </div>

      <MaskReveal
        inline
        stagger={0.07}
        parts={words}
        className="mt-4 mb-0 font-display text-[clamp(56px,10vw,152px)] leading-[0.9] font-normal uppercase"
      />

      <Reveal as="p" delay={0.2} className="m-0 max-w-[560px] text-xl leading-[30px]">
        Join a physio community built for growth, connection and impact.
      </Reveal>

      <Reveal delay={0.35}>
        <Magnetic strength={0.45}>
          <span className="relative inline-block">
            <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring border-4 border-ink" />
            <Button onClick={openJoin} variant="plain" className="relative px-10 py-6 text-base! hover:bg-white hover:text-ink">
              Join the community
            </Button>
          </span>
        </Magnetic>
      </Reveal>

      <Stagger
        stagger={0.12}
        className="flex flex-wrap justify-center gap-x-[0.8em] pl-[0.4em] text-sm leading-5 tracking-[0.4em] uppercase"
      >
        {['Networking', '•', 'Learning', '•', 'Growing'].map((w, i) => (
          <motion.span key={i} variants={fadeUp}>
            {w}
          </motion.span>
        ))}
      </Stagger>

      <footer className="mt-12 w-full">
        <DrawLine className="h-1 bg-ink" />
        <Stagger
          stagger={0.1}
          amount={0.5}
          className="flex flex-wrap justify-between gap-4 pt-6 text-left text-xs leading-4 font-bold tracking-[0.04em] uppercase"
        >
          <motion.div variants={fadeUp}>
            BEYOND PHYSIO
            <br />
            Hyderabad
          </motion.div>
          <motion.div variants={fadeUp} className="font-wide text-sm">
            Estd. 2026
          </motion.div>
          <motion.a
            variants={fadeUp}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="-my-3.5 py-3.5 underline-offset-4 hover:underline"
          >
            Instagram {INSTAGRAM_HANDLE}
          </motion.a>
        </Stagger>
      </footer>
    </section>
  )
}
