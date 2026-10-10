import { Fragment, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// trigger="view" animates when scrolled into view; "inherit" waits for a parent's variants
function triggerProps(trigger, amount = 0.3) {
  return trigger === 'inherit'
    ? {}
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount } }
}

export function Stagger({ as = 'div', trigger = 'view', stagger = 0.1, delay = 0, amount, children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      {...triggerProps(trigger, amount)}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Reveal({ as = 'div', trigger = 'view', delay = 0, y = 40, children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      {...triggerProps(trigger)}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Slides each part up from behind a mask. Block lines by default, or inline words.
export function MaskReveal({
  as = 'h2',
  parts,
  inline = false,
  trigger = 'view',
  stagger = 0.1,
  delay = 0,
  duration = 0.9,
  className,
  ...props
}) {
  const Tag = motion[as]
  const maskCls = inline
    ? 'inline-block overflow-hidden py-[0.1em] -my-[0.1em] align-bottom'
    : 'block overflow-hidden py-[0.1em] -my-[0.1em]'
  return (
    <Tag
      {...triggerProps(trigger, 0.4)}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      {...props}
    >
      {parts.map((part, i) => (
        <Fragment key={i}>
          <span className={maskCls}>
            <motion.span
              className={inline ? 'inline-block' : 'block'}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration, ease } },
              }}
            >
              {part}
            </motion.span>
          </span>
          {inline && i < parts.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

// Wrapper that drifts toward the mouse pointer
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 14, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  function move(e) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}

// 3D tilt that follows the pointer
export function Tilt({ children, max = 10, className = '' }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 15 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)

  function move(e) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

// Words light up one by one as the element scrolls through the viewport
export function ScrollWords({ as = 'p', text, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] })
  const Tag = as
  const words = text.split(' ')

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <ScrollWord progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </ScrollWord>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}

// Thin rule that draws itself left-to-right
export function DrawLine({ className = '', delay = 0 }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease, delay }}
    />
  )
}
