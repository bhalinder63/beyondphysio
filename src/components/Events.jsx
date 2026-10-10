import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import runImg from '../assets/community-run.webp'
import Countdown from './motion/Countdown.jsx'
import { DrawLine, Magnetic, MaskReveal, Stagger, Tilt, ease, fadeUp } from './motion/primitives.jsx'
import { Button, INSTAGRAM_HANDLE, INSTAGRAM_URL, Label, gutter } from './ui.jsx'

const EVENT_START = new Date('2026-10-11T07:00:00+05:30')

const details = [
  { label: 'Date', value: 'Sunday 11 Oct 2026' },
  { label: 'Time', value: '7 AM – 10 AM' },
  { label: 'Meeting point', value: 'Public Garden, Nampally, Hyderabad' },
]

const perks = ['Run together', 'Meet fellow physios', 'Coffee on us', 'Water on us', 'A special gift']

export default function Events() {
  const imgRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section
      id="events"
      className={`flex flex-wrap items-center gap-x-16 gap-y-12 overflow-hidden bg-ink py-24 text-white ${gutter}`}
    >
      <div ref={imgRef} className="max-w-[460px] flex-[1_1_320px]">
        <Tilt max={8}>
          <motion.div
            className="overflow-hidden"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease }}
          >
            <motion.img
              src={runImg}
              alt="Physio Community Run flyer: runners in Beyond Physio shirts at sunrise"
              className="block h-auto w-full scale-[1.14]"
              style={{ y: imgY }}
              loading="lazy"
            />
          </motion.div>
        </Tilt>
      </div>

      <div className="flex flex-[1_1_420px] flex-col items-start gap-6">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <Label>Next up</Label>
          <span className="flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-brand uppercase">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand" />
              <span className="relative size-2.5 rounded-full bg-brand" />
            </span>
            Limited slots
          </span>
        </motion.div>

        <MaskReveal
          stagger={0.12}
          parts={['Physio', 'Community', 'Run']}
          className="m-0 font-wide text-[clamp(32px,4.6vw,64px)] leading-none font-black text-brand uppercase"
        />

        <Stagger className="flex flex-col items-start gap-6" stagger={0.12} delay={0.3} amount={0.2}>
          <motion.p variants={fadeUp} className="m-0 text-xl leading-[30px]">
            A 3K run, only for physios. Limited slots.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Countdown target={EVENT_START} />
          </motion.div>
        </Stagger>

        <div className="w-full">
          <DrawLine className="h-0.5 bg-white" />
          <Stagger as="dl" stagger={0.12} className="m-0 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 pt-6">
            {details.map((d) => (
              <motion.div key={d.label} variants={fadeUp}>
                <dt className="text-xs font-bold tracking-[0.04em] text-muted uppercase">{d.label}</dt>
                <dd className="m-0 font-extrabold uppercase">{d.value}</dd>
              </motion.div>
            ))}
          </Stagger>
        </div>

        <Stagger
          stagger={0.08}
          className="flex flex-wrap gap-x-3 text-sm leading-7 tracking-[0.2em] text-muted uppercase"
        >
          {perks.map((p, i) => (
            <motion.span key={p} variants={fadeUp}>
              {p}
              {i < perks.length - 1 && <span className="ml-3">•</span>}
            </motion.span>
          ))}
        </Stagger>

        <Magnetic>
          <Button
            href={INSTAGRAM_URL}
            variant="brand"
            className="px-8 py-5 hover:bg-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            DM {INSTAGRAM_HANDLE} to register
          </Button>
        </Magnetic>
      </div>
    </section>
  )
}
