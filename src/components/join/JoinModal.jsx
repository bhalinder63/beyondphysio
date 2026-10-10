import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import JoinForm from './JoinForm.jsx'

const JoinModalContext = createContext(() => {})

// Returns a function that opens the join form
export const useOpenJoin = () => useContext(JoinModalContext)

export function JoinModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openJoin = useCallback(() => setOpen(true), [])

  return (
    <JoinModalContext.Provider value={openJoin}>
      {children}
      <JoinModal open={open} onClose={() => setOpen(false)} />
    </JoinModalContext.Provider>
  )
}

function JoinModal({ open, onClose }) {
  const ref = useRef(null)
  // The form stays mounted while closed so an accidental close keeps the user's answers;
  // it's only reset (via key) after a successful submission.
  const [formKey, setFormKey] = useState(0)
  const submitted = useRef(false)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    document.documentElement.classList.toggle('overflow-hidden', open)
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  function handleClose() {
    onClose()
    if (submitted.current) {
      submitted.current = false
      setFormKey((k) => k + 1)
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      aria-labelledby="join-title"
      className="m-auto max-h-[calc(100svh-32px)] w-[min(820px,calc(100%-32px))] max-w-none overflow-y-auto overscroll-contain border-4 border-ink bg-brand p-0 text-ink backdrop:bg-ink/85 max-sm:h-svh max-sm:max-h-svh max-sm:w-full max-sm:border-0"
    >
      <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b-4 border-ink bg-brand px-[clamp(16px,4vw,40px)] py-5">
        <div>
          <h2 id="join-title" className="m-0 font-display text-[clamp(36px,6vw,64px)] leading-[0.9] font-normal uppercase">
            Join the community
          </h2>
          <p className="mt-2 mb-0 max-w-[560px] text-sm leading-5">
            A community for physiotherapy students, interns and professionals to connect, learn, collaborate and
            grow. Fields marked <span className="font-extrabold text-white">*</span> are required.
          </p>
        </div>
        <button
          type="button"
          onClick={() => ref.current.close()}
          aria-label="Close"
          className="grid size-11 shrink-0 cursor-pointer place-items-center bg-ink text-brand"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="4" aria-hidden="true">
            <path d="M3 3 L17 17 M17 3 L3 17" />
          </svg>
        </button>
      </header>

      <JoinForm key={formKey} onSubmitted={() => (submitted.current = true)} onClose={() => ref.current.close()} />
    </dialog>
  )
}
