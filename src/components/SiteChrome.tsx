import { useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { site } from '../data/site'

export const cdn = (file: string, w: number) =>
  `/.netlify/images?url=/img/${file}&w=${w}&fm=webp&q=78`

export const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// Absolute hashes so the links also work from /contact.
export const nav = [
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#engage', label: 'Engage' },
]

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 7v18M10 16l10-9M14 12.5L22 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <rect x="21" y="5" width="5" height="5" fill="var(--color-copper)" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a
          href="/#top"
          className="flex items-center gap-3"
          aria-label={`${site.name} home`}
        >
          <Mark className="size-7 text-bone" />
          <span className="font-mono text-sm font-semibold tracking-[0.32em]">
            {site.name}
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-mute transition-colors hover:text-bone"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm text-mute transition-colors hover:text-bone"
            activeProps={{ className: 'text-bone!', 'aria-current': 'page' }}
          >
            Contact
          </Link>
        </nav>
        <Link
          to="/contact"
          hash="inquiry"
          className="btn-primary hidden py-2.5! md:inline-flex"
        >
          Start a project{' '}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <button
          type="button"
          className="grid size-10 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-bone transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-bone transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-ink px-5 pb-8 pt-4 md:hidden"
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-display text-3xl"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block border-b border-line py-4 font-display text-3xl text-copper"
          >
            Contact us
          </Link>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-start gap-3">
            <Mark className="size-8 shrink-0" />
            <div>
              <p className="max-w-xs text-sm text-mute">{site.tagline}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-mono text-xs text-copper underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-mute"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-bone">
                {n.label}
              </a>
            ))}
            <Link to="/contact" className="hover:text-bone">
              Contact
            </Link>
          </nav>
        </div>
        <p
          aria-hidden="true"
          className="outline-text mt-16 select-none text-center font-mono text-[clamp(3.5rem,15.5vw,15rem)] font-bold leading-none tracking-[0.08em]"
        >
          {site.name}
        </p>
        <div className="flex flex-wrap justify-between gap-4 border-t border-line py-6 font-mono text-xs text-dim">
          <span>
            © {site.founded}–{year} {site.name}. All rights reserved.
          </span>
          <span>Engineered worldwide since {site.founded}</span>
        </div>
      </div>
    </footer>
  )
}
