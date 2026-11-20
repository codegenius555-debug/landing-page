import { readFileSync } from 'node:fs'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'
import { contactForm } from '../data/site'
import { validateContactSearch } from '../routes/contact'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

async function fill() {
  render(
    <ContactForm
      initialCapability="Data Engineering"
      initialEngagement="Dedicated team"
    />,
  )
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Your name'), 'Amara Okafor')
  await user.type(screen.getByLabelText('Work email'), 'amara@example.com')
  await user.type(
    screen.getByLabelText('Tell us about the project'),
    'We need a streaming pipeline.',
  )
  await user.type(screen.getByLabelText('Company'), 'Northwind')
  await user.click(screen.getByLabelText('$25k–$75k'))
  await user.click(screen.getByLabelText('Within 1–3 months'))
  await user.click(screen.getByLabelText(/send an NDA/))
  return user
}

describe('project inquiry form', () => {
  it('posts the inquiry to the registered Netlify form', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('Accepted'))
    vi.stubGlobal('fetch', fetch)
    const user = await fill()
    await user.click(screen.getByRole('button', { name: /Send inquiry/ }))
    await screen.findByText(/Thank you, Amara/)
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe(contactForm.endpoint)
    expect(Object.fromEntries(new URLSearchParams(init.body))).toMatchObject({
      'form-name': 'project-inquiry',
      capability: 'Data Engineering',
      engagement: 'Dedicated team',
      email: 'amara@example.com',
      budget: '$25k–$75k',
      timeline: 'Within 1–3 months',
      nda: 'Requested',
      subject: 'KRAFENIO inquiry: Data Engineering · Northwind',
    })
  })

  it('keeps details and shows an error when delivery fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('', { status: 500 })),
    )
    const user = await fill()
    await user.click(screen.getByRole('button', { name: /Send inquiry/ }))
    await screen.findByRole('alert')
    expect((screen.getByLabelText('Your name') as HTMLInputElement).value).toBe(
      'Amara Okafor',
    )
  })

  it('registers every submitted field in the static form file', () => {
    const html = readFileSync('public/__forms.html', 'utf8')
    for (const field of [
      'form-name',
      'subject',
      'name',
      'email',
      'company',
      'role',
      'capability',
      'stage',
      'budget',
      'timeline',
      'nda',
      'engagement',
      'message',
      'bot-field',
    ])
      expect(html).toContain(`name="${field}"`)
  })

  it('ignores unknown prefill values from the URL', () => {
    expect(
      validateContactSearch({
        capability: 'Cloud & DevOps',
        engagement: '<script>',
      }),
    ).toEqual({ capability: 'Cloud & DevOps', engagement: undefined })
  })
})
