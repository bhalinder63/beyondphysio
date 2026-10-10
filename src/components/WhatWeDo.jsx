import { motion, useReducedMotion } from 'motion/react'
import { useOpenJoin } from './join/JoinModal.jsx'
import { MaskReveal, Reveal, Stagger, ease } from './motion/primitives.jsx'
import { gutter } from './ui.jsx'

const offerings = [
  { title: 'Community events', detail: 'Runs • Meetups • Social experiences' },
  { title: 'Learning', detail: 'Workshops • Discussions • Research • Clinical knowledge' },
  { title: 'Collaboration', detail: 'Projects • Content • Ideas • Partnerships' },
  { title: 'Networking', detail: 'Meet physios beyond your college or workplace' },
  { title: 'Opportunities', detail: 'Jobs • Internships • Collaborations • Professional connections' },
]

const cardIn = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
}

export default function WhatWeDo() {
  const openJoin = useOpenJoin()
  const reduce = useReducedMotion()
  return (
    <section id="what" className={`flex flex-col gap-12 py-24 ${gutter}`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <MaskReveal
          parts={['What we do']}
          className="m-0 font-display text-[clamp(56px,8vw,120px)] leading-[0.92] font-normal uppercase"
        />
        <Reveal delay={0.3} className="text-right text-xs leading-4 font-bold tracking-[0.04em] uppercase">
          Not just events.
          <br />
          Five ways in.
        </Reveal>
      </div>

      <Stagger
        stagger={0.1}
        amount={0.15}
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-1 border-4 border-ink bg-ink"
      >
        {offerings.map((o, i) => (
          <motion.div
            key={o.title}
            variants={cardIn}
            className="group relative flex min-h-[220px] flex-col gap-4 overflow-hidden bg-brand p-8"
          >
            {/* Ink fill that wipes up on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />
            <div className="relative flex items-center justify-between font-wide text-sm font-bold transition-colors duration-500 group-hover:text-brand">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                aria-hidden="true"
                className="-translate-x-3 translate-y-3 opacity-0 transition-[translate,opacity] duration-500 group-hover:translate-0 group-hover:opacity-100"
              >
                <path d="M6 34 L34 6 M12 6 H34 V28" />
              </svg>
            </div>
            <h3 className="relative mt-auto mb-0 font-display text-5xl leading-[0.95] font-normal uppercase transition-[color,translate] duration-500 group-hover:-translate-y-1 group-hover:text-brand">
              {o.title}
            </h3>
            <p className="relative m-0 text-rust transition-colors duration-500 group-hover:text-muted">{o.detail}</p>
          </motion.div>
        ))}

        <motion.button
          type="button"
          variants={cardIn}
          onClick={openJoin}
          className="group flex min-h-[220px] cursor-pointer flex-col justify-between gap-4 bg-ink p-8 text-left text-brand transition-colors duration-500 hover:bg-white hover:text-ink"
        >
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            aria-hidden="true"
            animate={reduce ? undefined : { x: [0, 6, 0], y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M6 34 L34 6 M12 6 H34 V28" />
          </motion.svg>
          <span className="font-display text-5xl leading-[0.95] uppercase">Join the community</span>
        </motion.button>
      </Stagger>
    </section>
  )
}
