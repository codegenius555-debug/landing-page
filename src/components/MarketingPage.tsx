import { useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import {
  approach,
  capabilities,
  engagements,
  nextSteps,
  principles,
  stackRows,
  stats,
} from '../data/content'
import { site } from '../data/site'
import { Footer, Header, cdn, delay } from './SiteChrome'

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="unveil absolute inset-0" style={delay(100)}>
        <img
          src={cdn('hero.png', 1600)}
          srcSet={`${cdn('hero.png', 900)} 900w, ${cdn('hero.png', 1600)} 1600w, ${cdn('hero.png', 2400)} 2400w`}
          sizes="100vw"
          alt="Interlocking blocks of graphite steel and copper, engraved with circuit-like grooves"
          className="h-full w-full object-cover object-[70%_center] opacity-80"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1400px] flex-col justify-between px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <div className="max-w-3xl">
          <p
            className="eyebrow rise flex items-center gap-3"
            style={delay(300)}
          >
            <span className="pulse-dot size-1.5 rounded-full bg-copper" />
            Global engineering company · Est. {site.founded}
          </p>
          <h1
            className="rise mt-8 font-display text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
            style={delay(450)}
          >
            Software,
            <br />
            <em className="text-copper">crafted</em> by
            <br />
            senior engineers.
          </h1>
          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl"
            style={delay(650)}
          >
            {site.name} is a team of 50+ engineers from around the world,
            averaging a decade of experience each. We design, build, and run the
            systems ambitious companies depend on, across almost every modern
            stack.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4" style={delay(800)}>
            <Link to="/contact" hash="inquiry" className="btn-primary">
              Start a project{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a href="#capabilities" className="btn-ghost">
              Explore capabilities
            </a>
          </div>
        </div>

        <dl
          className="rise mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4"
          style={delay(1000)}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-6 pr-4 ${i % 2 === 1 ? 'pl-6 border-l border-line' : ''} ${i >= 1 ? 'lg:border-l lg:border-line lg:pl-6' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mb-2 font-display text-5xl sm:text-6xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Capabilities() {
  const [active, setActive] = useState(0)
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-16 border-t border-line"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[5fr_7fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow reveal">Engineering capabilities</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[1] sm:text-6xl">
            Six disciplines.
            <br />
            <em className="text-mute">One senior team.</em>
          </h2>
          <p className="reveal mt-6 max-w-md text-mute">
            Every engagement draws on the whole bench, so the people who design
            your cloud also understand your data and your tests.
          </p>
          <div className="reveal mt-12 hidden aspect-square max-w-sm border border-line p-8 lg:block">
            <p className="font-mono text-xs text-dim">
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(capabilities.length).padStart(2, '0')}
            </p>
            <p
              key={active}
              className="rise mt-6 font-display text-3xl leading-snug"
            >
              {capabilities[active].detail}
            </p>
          </div>
        </div>

        <ol className="border-t border-line">
          {capabilities.map((c, i) => {
            const isOpen = active === i
            return (
              <li key={c.slug} className="reveal border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`cap-${c.slug}`}
                  onClick={() => setActive(i)}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-8 text-left sm:grid-cols-[4.5rem_1fr_auto]"
                >
                  <span
                    className={`font-mono text-sm transition-colors ${isOpen ? 'text-copper' : 'text-dim'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className={`block font-display text-3xl transition-[color,transform] duration-500 sm:text-[2.6rem] ${isOpen ? 'translate-x-2 text-bone' : 'text-bone/70 group-hover:text-bone'}`}
                    >
                      {c.title}
                    </span>
                    <span className="mt-2 block text-mute">{c.summary}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-10 place-items-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-45 border-copper bg-copper text-ink' : 'border-line text-mute'}`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`cap-${c.slug}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10 pl-[3rem] sm:pl-[4.5rem]">
                      <p className="mb-6 max-w-lg text-bone/80 lg:hidden">
                        {c.detail}
                      </p>
                      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {c.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-3 text-sm text-bone/85"
                          >
                            <span className="h-px w-4 bg-copper" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contact"
                        search={{ capability: c.title }}
                        hash="inquiry"
                        tabIndex={isOpen ? 0 : -1}
                        className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-copper hover:underline underline-offset-4"
                      >
                        Discuss {c.title.toLowerCase()} →
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-16 border-t border-line bg-ink-2"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <figure className="reveal relative lg:-ml-16">
            <img
              src={cdn('studio.png', 1200)}
              srcSet={`${cdn('studio.png', 700)} 700w, ${cdn('studio.png', 1200)} 1200w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="A KRAFENIO engineering workspace at dusk with code on two laptops and architecture sketches in a notebook"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute -bottom-8 right-4 max-w-[17rem] border border-line bg-ink p-6 sm:right-[-2rem]">
              <p className="eyebrow">How we're built</p>
              <p className="mt-3 font-display text-2xl leading-snug">
                Distributed across time zones. Aligned on one standard.
              </p>
            </div>
          </figure>
          <ul className="mt-20 space-y-4">
            {principles.map((p) => (
              <li key={p} className="reveal flex gap-4 text-bone/85">
                <span className="mt-2.5 size-1.5 shrink-0 bg-copper" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow reveal">Our approach</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[1] sm:text-6xl">
            Craft is a process,
            <br />
            <em className="text-copper">not a slogan.</em>
          </h2>
          <ol className="mt-14 space-y-0">
            {approach.map((a) => (
              <li
                key={a.step}
                className="reveal group grid grid-cols-[4rem_1fr] gap-6 border-t border-line py-8 last:border-b"
              >
                <span className="font-display text-5xl text-dim transition-colors duration-500 group-hover:text-copper">
                  {a.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-mute">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section
      id="stack"
      className="scroll-mt-16 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-[1400px] flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
        <div>
          <p className="eyebrow reveal">Technology</p>
          <h2 className="reveal mt-6 max-w-2xl font-display text-5xl leading-[1] sm:text-6xl">
            If it runs in production, we've likely shipped it.
          </h2>
        </div>
        <p className="reveal max-w-sm text-mute">
          From mainstream frameworks to niche enterprise platforms, we pick the
          stack that fits your problem rather than the one we happen to know.
        </p>
      </div>
      <div className="marquee-wrap space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {stackRows.map((row, r) => (
          <div
            key={r}
            className={`marquee flex w-max gap-4 ${r % 2 === 1 ? 'marquee-reverse' : ''}`}
            style={{ '--speed': `${52 + r * 10}s` } as CSSProperties}
          >
            {[...row, ...row].map((t, i) => (
              <span
                key={`${t}-${i}`}
                aria-hidden={i >= row.length}
                className="whitespace-nowrap border border-line px-6 py-3 font-mono text-sm text-bone/80 transition-colors hover:border-copper hover:text-copper"
              >
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Engage() {
  return (
    <section id="engage" className="scroll-mt-16 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <p className="eyebrow reveal">Ways to work together</p>
        <h2 className="reveal mt-6 max-w-3xl font-display text-5xl leading-[1] sm:text-6xl">
          Engagements shaped around <em className="text-mute">your</em> team.
        </h2>
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr] lg:items-start">
          {engagements.map((e, i) => (
            <article
              key={e.title}
              className={`reveal group flex flex-col justify-between border border-line bg-ink p-8 transition-colors duration-500 hover:border-copper/50 hover:bg-ink-3 sm:p-10 ${i === 0 ? 'lg:min-h-[380px]' : i === 1 ? 'lg:mt-14' : 'lg:mt-28'}`}
            >
              <div>
                <p className="font-mono text-xs text-dim">0{i + 1}</p>
                <h3 className="mt-6 font-display text-4xl">{e.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-mute">
                  {e.body}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-copper">
                  Best for: {e.fit}
                </span>
                <Link
                  to="/contact"
                  search={{ engagement: e.title }}
                  hash="inquiry"
                  aria-label={`Ask about ${e.title.toLowerCase()}`}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-ink"
                >
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden border-t border-line"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[6fr_5fr] lg:items-end">
        <div>
          <p className="eyebrow reveal">Contact</p>
          <h2 className="reveal mt-6 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
            Tell us what
            <br />
            you're <em className="text-copper">building.</em>
          </h2>
          <p className="reveal mt-8 max-w-md text-lg text-mute">
            Share a few details and a senior engineer, not a salesperson, will
            get back to you within one business day.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link to="/contact" hash="inquiry" className="btn-primary">
              Start a project inquiry{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-bone/85 underline decoration-line underline-offset-[6px] transition-colors hover:text-copper hover:decoration-copper"
            >
              {site.email}
            </a>
          </div>
        </div>
        <ol className="reveal border-t border-line">
          {nextSteps.map((n, i) => (
            <li
              key={n.title}
              className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-5"
            >
              <span className="font-mono text-xs text-copper">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-lg">{n.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function MarketingPage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Approach />
        <Stack />
        <Engage />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
