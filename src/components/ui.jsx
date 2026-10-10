export const INSTAGRAM_URL = 'https://instagram.com/beyondphysio.hyd'
export const INSTAGRAM_HANDLE = '@beyondphysio.hyd'

// Horizontal page gutter shared by every section
export const gutter = 'px-[clamp(16px,4vw,48px)]'

export function Label({ children }) {
  return (
    <div className="bg-brand px-5 py-3 text-sm leading-none font-extrabold tracking-[0.5em] text-ink uppercase">
      {children}
    </div>
  )
}

const buttonVariants = {
  solid: 'bg-ink text-brand border-4 border-ink',
  outline: 'border-4 border-ink',
  brand: 'bg-brand text-ink',
  plain: 'bg-ink text-brand',
}

// Renders a link when given href, otherwise a <button>
export function Button({ href, variant = 'solid', className = '', children, ...props }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      type={href ? undefined : 'button'}
      className={`inline-block cursor-pointer text-sm leading-none font-extrabold tracking-[0.14em] uppercase no-underline transition-[translate,background-color,color] duration-200 hover:-translate-y-0.5 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
