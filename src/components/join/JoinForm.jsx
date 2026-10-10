import { useState } from 'react'
import { submitJoinForm } from '../../lib/submitJoinForm.js'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../ui.jsx'
import { allFields, sections, validateField } from './fields.js'

const labelCls = 'block text-xs leading-5 font-extrabold tracking-[0.14em] uppercase'
const inputCls =
  'mt-2 block w-full border-4 border-ink bg-white/90 px-4 py-3 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/40 focus:bg-white focus:outline-none aria-invalid:bg-[#fff1ea]'

function Required() {
  return (
    <>
      <span className="text-white" aria-hidden="true">
        {' *'}
      </span>
      <span className="sr-only"> (required)</span>
    </>
  )
}

function ErrorText({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 mb-0 inline-block bg-ink px-2 py-1 text-xs font-extrabold tracking-wider text-white uppercase">
      {children}
    </p>
  )
}

function ChoiceGroup({ field, error }) {
  const errId = `join-${field.name}-error`
  return (
    <fieldset className="col-span-full m-0 min-w-0 border-0 p-0" aria-describedby={error ? errId : undefined}>
      <legend className={labelCls}>
        {field.label}
        {field.required && <Required />}
        {field.hint && <span className="ml-2 font-bold tracking-normal normal-case opacity-70">({field.hint})</span>}
      </legend>
      <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2">
        {field.options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-3 border-2 border-ink px-4 py-3 text-sm leading-5 font-bold transition-colors select-none hover:bg-ink/10 has-checked:bg-ink has-checked:text-brand has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
          >
            <input type={field.type} name={field.name} value={opt} className="peer sr-only" />
            <span
              aria-hidden="true"
              className={`grid size-4 shrink-0 place-items-center border-2 border-current peer-checked:*:opacity-100 ${field.type === 'radio' ? 'rounded-full' : ''}`}
            >
              <span className={`size-2 bg-current opacity-0 ${field.type === 'radio' ? 'rounded-full' : ''}`} />
            </span>
            {opt}
          </label>
        ))}
      </div>
      <ErrorText id={errId}>{error}</ErrorText>
    </fieldset>
  )
}

function TextField({ field, error }) {
  const id = `join-${field.name}`
  const errId = `${id}-error`
  const shared = {
    id,
    name: field.name,
    placeholder: field.placeholder,
    autoComplete: field.autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
    'aria-required': field.required || undefined,
    className: inputCls,
  }
  return (
    <div className={field.wide ? 'col-span-full' : ''}>
      <label htmlFor={id} className={labelCls}>
        {field.label}
        {field.required && <Required />}
      </label>
      {field.type === 'textarea' ? (
        <textarea rows={4} {...shared} className={`${inputCls} resize-y`} />
      ) : (
        <input type={field.type} inputMode={field.inputMode} min={field.min} max={field.max} {...shared} />
      )}
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  )
}

function readValues(form) {
  const fd = new FormData(form)
  return Object.fromEntries(
    allFields.map((f) => [f.name, f.type === 'checkbox' ? fd.getAll(f.name) : String(fd.get(f.name) ?? '')]),
  )
}

export default function JoinForm({ onSubmitted, onClose }) {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const values = readValues(form)

    const nextErrors = {}
    for (const f of allFields) {
      const msg = validateField(f, values[f.name])
      if (msg) nextErrors[f.name] = msg
    }
    setErrors(nextErrors)

    const firstInvalid = allFields.find((f) => nextErrors[f.name])
    if (firstInvalid) {
      form.querySelector(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitJoinForm({
        ...values,
        email: values.email.trim(),
        phone: values.phone.replace(/[\s-]/g, ''),
        instagram: values.instagram.trim().replace(/^@/, ''),
        age: Number(values.age),
        submittedAt: new Date().toISOString(),
      })
      setStatus('success')
      onSubmitted()
    } catch (err) {
      console.error('[join] submit failed', err)
      setStatus('error')
    }
  }

  // Clear a field's error as soon as the user changes it
  function handleChange(e) {
    const { name } = e.target
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-6 px-[clamp(16px,4vw,40px)] py-16" role="status">
        <h3 className="m-0 font-display text-[clamp(48px,8vw,96px)] leading-[0.9] font-normal uppercase">
          You&apos;re <span className="text-white">in.</span>
        </h3>
        <p className="m-0 max-w-[480px] text-lg leading-7">
          Thanks for joining Beyond Physio. We&apos;ll be in touch with next steps — meanwhile, follow us on
          Instagram for event updates.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink px-8 py-4 text-sm leading-none font-extrabold tracking-[0.14em] text-brand uppercase no-underline"
          >
            Follow {INSTAGRAM_HANDLE}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border-4 border-ink px-8 py-3 text-sm leading-none font-extrabold tracking-[0.14em] uppercase"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} onChange={handleChange} className="flex flex-col">
      {sections.map((section, i) => (
        <section key={section.title} className="border-b-4 border-ink px-[clamp(16px,4vw,40px)] py-8">
          <h3 className="mt-0 mb-6 flex items-baseline gap-3 font-display text-3xl leading-none font-normal uppercase">
            <span className="font-wide text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
            {section.title}
          </h3>
          <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {section.fields.map((field) =>
              field.type === 'radio' || field.type === 'checkbox' ? (
                <ChoiceGroup key={field.name} field={field} error={errors[field.name]} />
              ) : (
                <TextField key={field.name} field={field} error={errors[field.name]} />
              ),
            )}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-4 px-[clamp(16px,4vw,40px)] py-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="cursor-pointer bg-ink px-10 py-5 text-base leading-none font-extrabold tracking-[0.14em] text-brand uppercase transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'submitting' ? 'Submitting…' : 'Join the community'}
        </button>
        {Object.keys(errors).length > 0 && (
          <p className="m-0 text-sm font-bold" role="alert">
            Please fix the highlighted fields.
          </p>
        )}
        {status === 'error' && (
          <p className="m-0 text-sm font-bold" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  )
}
