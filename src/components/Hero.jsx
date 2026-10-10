import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import heroImg from '../assets/hero.webp'
import { useOpenJoin } from './join/JoinModal.jsx'
import { MaskReveal, Magnetic, ease, fadeUp } from './motion/primitives.jsx'
import { Button, gutter } from './ui.jsx'

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const imageIn = {
  hidden: { clipPath: 'inset(20% 30% 20% 30%)', opacity: 0, scale: 1.25 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease },
  },
}

export default function Hero({ ready }) {
  const openJoin = useOpenJoin()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%'])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -4])

  return (
    // Fills the first screen below the header; the image absorbs whatever height is left over
    <motion.section
      ref={ref}
      id="top"
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
      className={`flex min-h-[calc(100svh-var(--header-h,88px))] flex-col items-center gap-[clamp(12px,2.4svh,32px)] pt-[clamp(8px,2svh,24px)] pb-[clamp(16px,4svh,48px)] text-center ${gutter}`}
    >
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="flex w-full flex-wrap justify-between gap-4 text-left text-xs leading-4 font-bold tracking-[0.04em] uppercase"
      >
        <motion.div variants={fadeDown}>
          Beyond limits.
          <br />
          Beyond recovery.
          <br />
          Beyond you.
        </motion.div>
        <motion.div variants={fadeDown} className="font-wide text-sm">
          Estd.
          <br />
          2026
        </motion.div>
        <motion.div variants={fadeDown} className="text-right">
          For physios
          <br />
          by physios
        </motion.div>
      </motion.div>

      <motion.div className="relative min-h-[140px] w-full flex-1" style={{ y: imageY, rotate: imageRotate }}>
        <motion.img
          variants={imageIn}
          src={heroImg}
          alt="BEYOND Physio Community"
          className="absolute top-1/2 left-1/2 block aspect-[1254/740] h-full max-h-[484px] max-w-[min(100%,820px)] -translate-x-1/2 -translate-y-1/2 object-cover object-[center_52%]"
          fetchPriority="high"
        />
      </motion.div>

      <MaskReveal
        as="h1"
        trigger="inherit"
        stagger={0.12}
        duration={1}
        parts={['More than', 'physiotherapy.']}
        className="m-0 font-display text-[clamp(44px,min(11vw,11svh),160px)] leading-[0.9] font-normal uppercase"
      />

      <motion.p variants={fadeUp} className="m-0 max-w-[620px] text-base leading-6 sm:text-xl sm:leading-[30px]">
        A community built for physiotherapists, students and interns to connect, learn, collaborate
        and grow.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
        <Magnetic>
          <Button onClick={openJoin} className="px-8 py-[clamp(12px,2svh,16px)]">
            Join the community
          </Button>
        </Magnetic>
        <Magnetic>
          <Button
            href="#events"
            variant="outline"
            className="px-8 py-[clamp(12px,2svh,16px)] hover:bg-ink hover:text-brand"
          >
            Explore events
          </Button>
        </Magnetic>
      </motion.div>

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="flex flex-wrap justify-center gap-x-[0.8em] pl-[0.4em] text-sm leading-5 tracking-[0.4em] uppercase"
      >
        {['Move', '•', 'Play', '•', 'Connect', '•', 'Grow'].map((w, i) => (
          <motion.span key={i} variants={fadeUp}>
            {w}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  )
}
