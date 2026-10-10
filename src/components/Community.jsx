import { motion } from 'motion/react'
import { DrawLine, MaskReveal, Stagger, ease, fadeUp } from './motion/primitives.jsx'
import { gutter } from './ui.jsx'

const stages = [
  { title: 'Students', text: 'Still in college, already curious about what comes after it.' },
  { title: 'Interns', text: 'In the thick of it, finding your people and your direction.' },
  { title: 'Physiotherapists', text: 'Out in practice, with knowledge to share and more to learn.' },
]

export default function Community() {
  return (
    <section id="community" className={`flex flex-col gap-12 bg-white py-24 ${gutter}`}>
      <MaskReveal
        stagger={0.15}
        parts={['Different stages.', <span className="text-brand">One community.</span>]}
        className="m-0 font-display text-[clamp(56px,9vw,136px)] leading-[0.92] font-normal uppercase"
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {stages.map((s, i) => (
          <Stagger key={s.title} delay={0.3 + i * 0.15} stagger={0.1} className="group flex flex-col gap-2">
            <DrawLine className="h-1 bg-ink" delay={i * 0.15} />
            <motion.div
              variants={fadeUp}
              className="pt-5 font-wide text-[clamp(22px,2.4vw,32px)] leading-[1.1] font-black uppercase transition-colors duration-300 group-hover:text-brand"
            >
              {s.title}
            </motion.div>
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
              }}
              className="m-0 text-muted-dark"
            >
              {s.text}
            </motion.p>
          </Stagger>
        ))}
      </div>
    </section>
  )
}
