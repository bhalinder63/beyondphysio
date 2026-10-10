import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import WhatWeDo from './components/WhatWeDo.jsx'
import Community from './components/Community.jsx'
import Events from './components/Events.jsx'
import Join from './components/Join.jsx'
import { JoinModalProvider } from './components/join/JoinModal.jsx'
import Intro from './components/motion/Intro.jsx'
import ScrollProgress from './components/motion/ScrollProgress.jsx'

export default function App() {
  const reduce = useReducedMotion()
  const [introDone, setIntroDone] = useState(!!reduce)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <JoinModalProvider>
        <AnimatePresence>{!introDone && <Intro key="intro" onDone={finishIntro} />}</AnimatePresence>
        <ScrollProgress />
        {/* overflow-x-clip (not hidden) so the sticky header keeps working */}
        <div className="overflow-x-clip">
          <Header ready={introDone} />
          <main>
            <Hero ready={introDone} />
            <Marquee />
            <About />
            <WhatWeDo />
            <Community />
            <Marquee text="Move • Play • Connect • Grow •" reverse className="bg-brand text-ink" />
            <Events />
            <Join />
          </main>
        </div>
      </JoinModalProvider>
    </MotionConfig>
  )
}
