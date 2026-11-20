import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '../components/ContactPage'
import { capabilities, engagements } from '../data/content'
import { site } from '../data/site'

type ContactSearch = { capability?: string; engagement?: string }

const pick = (value: unknown, allowed: string[]) =>
  typeof value === 'string' && allowed.includes(value) ? value : undefined

export const validateContactSearch = (
  search: Record<string, unknown>,
): ContactSearch => ({
  capability: pick(
    search.capability,
    capabilities.map((c) => c.title),
  ),
  engagement: pick(
    search.engagement,
    engagements.map((e) => e.title),
  ),
})

const description = `Start a project with ${site.name}. Share a short brief and a senior engineer replies within one business day, or email ${site.email}.`

export const Route = createFileRoute('/contact')({
  validateSearch: validateContactSearch,
  head: () => ({
    meta: [
      { title: `Contact · ${site.name}` },
      { name: 'description', content: description },
      { property: 'og:title', content: `Contact ${site.name}` },
      { property: 'og:description', content: description },
    ],
  }),
  component: ContactRoute,
})

function ContactRoute() {
  const { capability, engagement } = Route.useSearch()
  return <ContactPage capability={capability} engagement={engagement} />
}
