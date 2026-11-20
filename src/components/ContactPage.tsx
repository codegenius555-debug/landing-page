import { useState } from 'react'
import { briefChecklist, faqs, nextSteps } from '../data/content'
import { site } from '../data/site'
import { ContactForm } from './ContactForm'
import { Footer, Header, delay } from './SiteChrome'

const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Project inquiry for KRAFENIO')}`

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = mailto
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-xs uppercase tracking-[0.18em] text-mute transition-colors hover:text-copper"
    >
      <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy address'}</span>
    </button>
  )
}

function Intro() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[7fr_5fr] lg:items-end">
        <div>
          <p
            className="eyebrow rise flex items-center gap-3"
            style={delay(100)}
          >
            <span className="pulse-dot size-1.5 rounded-full bg-copper" />
            Contact · Start a project
          </p>
          <h1
            className="rise mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
            style={delay(250)}
          >
            Let’s talk about
            <br />
            what you’re <em className="text-copper">building.</em>
          </h1>
          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl"
            style={delay(400)}
          >
            Whether you have a detailed spec or just a hard problem, the fastest
            way in is a short brief. A senior engineer reads every inquiry and
            replies within one business day.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4" style={delay(550)}>
            <a href="#inquiry" className="btn-primary">
              Fill in the brief{' '}
              <span className="arrow" aria-hidden="true">
                ↓
              </span>
            </a>
            <a href="#faq" className="btn-ghost">
              Read the FAQ
            </a>
          </div>
        </div>

        <aside
          aria-label="Contact details"
          className="rise border border-line bg-ink-2"
          style={delay(700)}
        >
          <div className="p-7 sm:p-8">
            <p className="eyebrow">Email us directly</p>
            <a
              href={mailto}
              className="mt-4 block break-all font-display text-3xl leading-tight transition-colors hover:text-copper sm:text-[2.1rem]"
            >
              {site.email}
            </a>
            <div className="mt-5">
              <CopyEmail />
            </div>
          </div>
          <dl className="grid grid-cols-2 border-t border-line">
            <div className="border-r border-line p-7 sm:p-8">
              <dt className="eyebrow">Response time</dt>
              <dd className="mt-2">Within one business day</dd>
            </div>
            <div className="p-7 sm:p-8">
              <dt className="eyebrow">Where we work</dt>
              <dd className="mt-2">Remote-first, engineers worldwide</dd>
            </div>
            <div className="col-span-2 border-t border-line p-7 sm:p-8">
              <dt className="eyebrow">Hours</dt>
              <dd className="mt-2">
                Distributed across time zones, with overlap hours agreed for
                your team
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

function Inquiry({
  capability,
  engagement,
}: {
  capability?: string
  engagement?: string
}) {
  return (
    <section
      id="inquiry"
      tabIndex={-1}
      className="scroll-mt-16 border-t border-line bg-ink-2/40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow reveal">Project brief</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[1]">
            What happens
            <br />
            <em className="text-mute">after you hit send.</em>
          </h2>
          <ol className="mt-12">
            {nextSteps.map((n, i) => (
              <li
                key={n.title}
                className="reveal relative grid grid-cols-[2.75rem_1fr] pb-9 last:pb-0"
              >
                {i < nextSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[0.6875rem] top-8 w-px bg-line"
                  />
                )}
                <span className="grid size-6 place-items-center rounded-full border border-copper font-mono text-[10px] text-copper">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{n.title}</h3>
                  <p className="mt-2 leading-relaxed text-mute">{n.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="reveal">
          <ContactForm
            key={`${capability}|${engagement}`}
            initialCapability={capability}
            initialEngagement={engagement}
          />
        </div>
      </div>
    </section>
  )
}

function EmailBrief() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow reveal">Prefer email?</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[1]">
            Write it your way.
          </h2>
          <p className="reveal mt-6 max-w-md text-mute">
            Send your brief, RFP, or a few rough notes to{' '}
            <a
              href={mailto}
              className="text-bone underline decoration-line underline-offset-4 hover:text-copper hover:decoration-copper"
            >
              {site.email}
            </a>
            . Including the points on the right helps us reply with something
            useful the first time.
          </p>
          <a href={mailto} className="btn-ghost reveal mt-10">
            Open email{' '}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <ul className="reveal self-center border-t border-line">
          {briefChecklist.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-b border-line py-5 text-bone/85"
            >
              <span className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-copper" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">Questions</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[1]">
            Before you <em className="text-copper">reach out.</em>
          </h2>
        </div>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="reveal group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-mute transition-all duration-300 group-open:rotate-45 group-open:border-copper group-open:bg-copper group-open:text-ink"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-mute">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactPage({
  capability,
  engagement,
}: {
  capability?: string
  engagement?: string
}) {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Intro />
        <Inquiry capability={capability} engagement={engagement} />
        <EmailBrief />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
