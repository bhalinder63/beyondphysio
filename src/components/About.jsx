import { motion } from 'motion/react'
import { MaskReveal, ScrollWords, Stagger, ease, fadeUp } from './motion/primitives.jsx'
import { Label, gutter } from './ui.jsx'

export default function About() {
  return (
    <section
      id="about"
      className={`flex flex-wrap gap-x-16 gap-y-12 bg-ink py-24 text-white ${gutter}`}
    >
      <div className="flex flex-[1_1_360px] flex-col items-start gap-6">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <Label>About</Label>
        </motion.div>
        <MaskReveal
          parts={['What', <>are <span className="text-brand">we?</span></>]}
          className="m-0 font-display text-[clamp(56px,8vw,120px)] leading-[0.92] font-normal uppercase"
        />
      </div>

      <Stagger className="flex max-w-[640px] flex-[1_1_420px] flex-col gap-6" stagger={0.15} amount={0.2}>
        <motion.p variants={fadeUp} className="m-0 text-xl leading-[30px]">
          Beyond Physio is a community for people in physiotherapy who want to experience more than
          just academics and clinical practice.
        </motion.p>
        <motion.p variants={fadeUp} className="m-0 text-muted">
          We bring together students, interns and physiotherapists to build connections, share
          knowledge, discover opportunities, collaborate on ideas and create experiences together.
        </motion.p>
        <motion.p variants={fadeUp} className="m-0 text-muted">
          From community runs and meetups to learning sessions, collaborations and future
          professional opportunities, Beyond Physio is about building the people and network behind
          physiotherapy.
        </motion.p>
        <ScrollWords
          text="Because physiotherapy doesn't have to end at the clinic."
          className="mt-4 mb-0 font-display text-[clamp(28px,3.4vw,48px)] leading-[0.95] text-brand uppercase"
        />
      </Stagger>
    </section>
  )
}
