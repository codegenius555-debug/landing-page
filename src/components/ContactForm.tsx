import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  NOT_SURE,
  budgets,
  capabilities,
  engagements,
  projectStages,
  timelines,
} from '../data/content'
import { contactForm, site } from '../data/site'

type Status = 'idle' | 'pending' | 'success' | 'error'

function Group({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-x-8 gap-y-8 border-t border-line pt-8 first:border-t-0 first:pt-0 sm:grid-cols-2">
      <p className="flex items-center gap-3 sm:col-span-2">
        <span className="font-mono text-xs text-copper">{step}</span>
        <span className="font-display text-2xl">{title}</span>
      </p>
      {children}
    </div>
  )
}

function Chips({
  name,
  legend,
  options,
  optional = true,
}: {
  name: string
  legend: string
  options: string[]
  optional?: boolean
}) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="field-label">
        {legend}
        {optional && (
          <span className="ml-2 normal-case text-dim">optional</span>
        )}
      </legend>
      <div className="mt-1 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              className="peer sr-only"
            />
            <span className="block rounded-full border border-line px-4 py-2 text-sm text-bone/80 transition-colors hover:border-bone/50 peer-checked:border-copper peer-checked:bg-copper peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function ContactForm({
  initialCapability = NOT_SURE,
  initialEngagement = NOT_SURE,
}: {
  initialCapability?: string
  initialEngagement?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [sentName, setSentName] = useState('')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const data = new FormData(event.currentTarget)
    const company = String(data.get('company') ?? '').trim()
    data.set(
      'subject',
      `KRAFENIO inquiry: ${data.get('capability')}${company ? ` · ${company}` : ''}`,
    )
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, String(value)))
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch(contactForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Inquiry was not accepted')
      setSentName(String(data.get('name') ?? '').split(' ')[0] ?? '')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex min-h-[520px] flex-col justify-center border border-line bg-ink-2 p-8 sm:p-12"
      >
        <span className="mb-8 grid size-14 place-items-center rounded-full bg-copper text-ink">
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="font-display text-4xl leading-tight sm:text-5xl">
          Thank you{sentName ? `, ${sentName}` : ''}.
        </p>
        <p className="mt-4 max-w-md text-mute">
          Your inquiry has reached the KRAFENIO team. A senior engineer will
          reply within one business day to set up an introductory call.
        </p>
        <p className="mt-4 max-w-md text-mute">
          Have files or links to add? Send them to{' '}
          <a
            href={`mailto:${site.email}`}
            className="text-copper underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-10 self-start font-mono text-xs uppercase tracking-[0.18em] text-copper underline-offset-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      name={contactForm.name}
      method="POST"
      action={contactForm.endpoint}
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      aria-busy={status === 'pending'}
      onChange={() => {
        if (!submitting.current && status === 'error') setStatus('idle')
      }}
      className="border border-line bg-ink-2 p-6 sm:p-10"
    >
      <input type="hidden" name="form-name" value={contactForm.name} />
      <input type="hidden" name="subject" value="KRAFENIO inquiry" />
      <p hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset
        disabled={status === 'pending'}
        className="space-y-10 disabled:opacity-60"
      >
        <legend className="sr-only">Project inquiry</legend>

        <Group step="01" title="About you">
          <div>
            <label htmlFor="c-name" className="field-label">
              Your name
            </label>
            <input
              id="c-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Amara Okafor"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="c-email" className="field-label">
              Work email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="amara@company.com"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="c-company" className="field-label">
              Company
            </label>
            <input
              id="c-company"
              name="company"
              autoComplete="organization"
              maxLength={120}
              placeholder="Optional"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="c-role" className="field-label">
              Your role
            </label>
            <input
              id="c-role"
              name="role"
              autoComplete="organization-title"
              maxLength={120}
              placeholder="Optional, e.g. CTO"
              className="field"
            />
          </div>
        </Group>

        <Group step="02" title="The project">
          <div>
            <label htmlFor="c-capability" className="field-label">
              What do you need?
            </label>
            <select
              id="c-capability"
              name="capability"
              defaultValue={initialCapability}
              className="field cursor-pointer"
            >
              {capabilities.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
              <option value={NOT_SURE}>{NOT_SURE}</option>
            </select>
          </div>
          <div>
            <label htmlFor="c-engagement" className="field-label">
              Engagement
            </label>
            <select
              id="c-engagement"
              name="engagement"
              defaultValue={initialEngagement}
              className="field cursor-pointer"
            >
              {engagements.map((e) => (
                <option key={e.title} value={e.title}>
                  {e.title}
                </option>
              ))}
              <option value={NOT_SURE}>{NOT_SURE}</option>
            </select>
          </div>
          <Chips
            name="stage"
            legend="Where are you starting from?"
            options={projectStages}
          />
          <Chips name="budget" legend="Budget range" options={budgets} />
          <Chips
            name="timeline"
            legend="When do you want to start?"
            options={timelines}
          />
        </Group>

        <Group step="03" title="The details">
          <div className="sm:col-span-2">
            <label htmlFor="c-message" className="field-label">
              Tell us about the project
            </label>
            <textarea
              id="c-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={6}
              placeholder="Goals, users, current stack, integrations, deadlines, and links to anything you can share."
              className="field resize-y"
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-bone/85 sm:col-span-2">
            <input
              type="checkbox"
              name="nda"
              value="Requested"
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--color-copper)]"
            />
            <span>
              Please send an NDA before we discuss details.
              <span className="mt-1 block text-dim">
                Keep this first message high level and we will arrange it before
                you share anything confidential.
              </span>
            </span>
          </label>
        </Group>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <p className="max-w-xs text-sm text-dim">
            We reply within one business day. No sales sequences, just an
            engineer.
          </p>
          <button type="submit" className="btn-primary">
            {status === 'pending' ? 'Sending…' : 'Send inquiry'}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </fieldset>
      <p role="status" className="sr-only">
        {status === 'pending' ? 'Sending your inquiry…' : ''}
      </p>
      {status === 'error' && (
        <p
          role="alert"
          className="mt-8 border-l-2 border-copper pl-4 text-sm text-copper-soft"
        >
          We couldn’t confirm your inquiry. Your details are still here, so
          please try again in a moment, or email us at{' '}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  )
}
