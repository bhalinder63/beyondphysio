import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Endless strip whose speed, direction and skew respond to scroll velocity
export default function Marquee({
  text = 'Connect. Learn. Collaborate. Grow.',
  speed = 2.5, // % of one half per second
  reverse = false,
  className = 'bg-ink text-brand',
}) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 2500], reduce ? [0, 0] : [12, -12])
  const direction = useRef(reverse ? 1 : -1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) direction.current = reverse ? -1 : 1
    else if (b > 0) direction.current = reverse ? 1 : -1
    const move = direction.current * speed * (delta / 1000) * (1 + Math.abs(b))
    baseX.set(wrap(-50, 0, baseX.get() + move))
  })

  const x = useTransform(baseX, (v) => `${v}%`)

  // Two identical halves so wrapping at -50% loops seamlessly
  const half = (
    <span className="flex shrink-0 gap-[0.4em] pr-[0.4em]">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i}>{text}</span>
      ))}
    </span>
  )

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden py-5 font-display text-[clamp(32px,5vw,56px)] leading-none whitespace-nowrap uppercase ${className}`}
    >
      <motion.div className="flex w-max" style={{ x, skewX }}>
        {half}
        {half}
      </motion.div>
    </div>
  )
}
