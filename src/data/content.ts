export type Capability = {
  slug: string
  title: string
  summary: string
  detail: string
  points: string[]
}

export const capabilities: Capability[] = [
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    summary: 'Purpose-built web, mobile, and enterprise applications.',
    detail:
      'Product-grade applications designed around your users and your domain, from first commit to long-term maintenance.',
    points: [
      'Web platforms & SaaS',
      'iOS, Android & cross-platform',
      'Enterprise & line-of-business systems',
      'Legacy modernisation',
    ],
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    summary: 'Intelligent workflows and applied AI.',
    detail:
      'Practical AI that earns its place in production: grounded in your data, measured against real outcomes, and safe to operate.',
    points: [
      'LLM apps, agents & RAG',
      'Process & document automation',
      'ML model integration',
      'Evaluation & guardrails',
    ],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    summary: 'Cloud foundations and reliable delivery.',
    detail:
      'Infrastructure you can reason about, and pipelines that ship small changes safely many times a day.',
    points: [
      'AWS, Azure & GCP landing zones',
      'Infrastructure as code',
      'CI/CD & release engineering',
      'Observability & SRE',
    ],
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    summary: 'Pipelines, integration, and analytics.',
    detail:
      'Trustworthy data moving at the speed of the business, from ingestion to the dashboards people actually use.',
    points: [
      'Batch & streaming pipelines',
      'Warehouses & lakehouses',
      'Data modelling & governance',
      'BI & analytics enablement',
    ],
  },
  {
    slug: 'quality-engineering',
    title: 'Quality Engineering',
    summary: 'Test strategy and engineering discipline.',
    detail:
      'Quality designed in, not inspected in: test strategy, automation, and the engineering habits that keep defects out.',
    points: [
      'Test strategy & audits',
      'End-to-end & API automation',
      'Performance & load testing',
      'Security & accessibility checks',
    ],
  },
  {
    slug: 'enterprise-integration',
    title: 'Enterprise Integration',
    summary: 'Secure APIs and connected systems.',
    detail:
      'Systems that talk to each other reliably and securely, across vendors, clouds, and decades of technology.',
    points: [
      'API design & gateways',
      'Event-driven architecture',
      'ERP, CRM & SaaS connectors',
      'Identity & zero-trust access',
    ],
  },
]

export const stats = [
  { value: '2020', label: 'Founded' },
  { value: '50+', label: 'Senior engineers' },
  { value: '~10', label: 'Years avg. experience' },
  { value: '6', label: 'Engineering capabilities' },
]

export const stackRows: string[][] = [
  [
    'TypeScript',
    'React',
    'Next.js',
    'Angular',
    'Vue',
    'Node.js',
    '.NET',
    'Java',
    'Spring',
    'Go',
    'Python',
    'Rust',
    'PHP',
    'Ruby',
  ],
  [
    'Swift',
    'Kotlin',
    'Flutter',
    'React Native',
    'AWS',
    'Azure',
    'Google Cloud',
    'Kubernetes',
    'Terraform',
    'Docker',
    'GitHub Actions',
    'Datadog',
  ],
  [
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Kafka',
    'Spark',
    'Airflow',
    'dbt',
    'Snowflake',
    'Databricks',
    'PyTorch',
    'OpenAI',
    'LangChain',
    'Playwright',
  ],
]

export const approach = [
  {
    step: '01',
    title: 'Discover',
    body: 'We start with the problem, not the stack: goals, constraints, users, and what success looks like in numbers.',
  },
  {
    step: '02',
    title: 'Architect',
    body: 'A pragmatic blueprint with clear trade-offs, a delivery plan, and the risks named up front.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Short iterations, working software every sprint, code review on every change, and full transparency.',
  },
  {
    step: '04',
    title: 'Operate',
    body: 'Monitoring, support, and continuous improvement after launch, or a clean hand-over to your team.',
  },
]

export const engagements = [
  {
    title: 'Dedicated team',
    body: 'A cross-functional KRAFENIO squad that works as an extension of your organisation.',
    fit: 'Long-running products',
  },
  {
    title: 'Project delivery',
    body: 'A defined outcome, scope, and timeline. We own delivery end-to-end.',
    fit: 'New builds & migrations',
  },
  {
    title: 'Team augmentation',
    body: 'Senior engineers who slot into your team and rituals to add capacity or expertise.',
    fit: 'Scaling existing teams',
  },
]

export const principles = [
  'Senior by default. No juniors learning on your budget.',
  'Engineers talk to you directly, without layers of account management.',
  'Your code, your IP, your repositories from day one.',
  'Documented decisions, so nothing lives only in someone’s head.',
]

/* Contact page */

export const NOT_SURE = 'Not sure yet'

export const projectStages = [
  'New product',
  'Existing product',
  'Modernisation or migration',
  'Extra capacity for my team',
]

export const budgets = [
  'Under $25k',
  '$25k–$75k',
  '$75k–$200k',
  '$200k+',
  NOT_SURE,
]

export const timelines = [
  'As soon as possible',
  'Within 1–3 months',
  'In 3–6 months',
  'Just exploring',
]

export const nextSteps = [
  {
    title: 'A senior engineer reads it',
    body: 'Your inquiry goes to an engineer with experience in your stack, not a sales queue. You get a reply within one business day.',
  },
  {
    title: 'Discovery call',
    body: 'A focused conversation about goals, constraints, and existing systems. Bring your technical people; we bring ours.',
  },
  {
    title: 'Written proposal',
    body: 'A clear scope, recommended team shape, delivery plan, and estimate, with the trade-offs and risks named up front.',
  },
  {
    title: 'Kick-off',
    body: 'Access, onboarding, and ways of working agreed. Working software from the first sprint, in your repositories.',
  },
]

export const briefChecklist = [
  'What you are building and who it is for',
  'Where things stand today: idea, prototype, or live product',
  'Your current stack and any systems we need to integrate with',
  'Timeline, deadlines, and budget range, even if rough',
  'Links to specs, designs, or repositories you can share',
]

export const faqs = [
  {
    q: 'How quickly will I hear back?',
    a: 'Within one business day. The reply comes from a senior engineer who has read your brief, usually with a few questions and times for a call.',
  },
  {
    q: 'Can we sign an NDA before sharing details?',
    a: 'Yes. Tick the NDA option in the form, keep your first message high level, and we will arrange the NDA before you share anything confidential.',
  },
  {
    q: 'I’m not sure which capability or engagement I need.',
    a: 'That is common. Choose “Not sure yet” and describe the problem. We will recommend an approach on the first call.',
  },
  {
    q: 'Who owns the code and IP?',
    a: 'You do, from day one. We work in your repositories and accounts wherever possible, so there is nothing to hand back at the end.',
  },
  {
    q: 'How does pricing work?',
    a: 'It depends on the engagement. Dedicated teams and team augmentation are typically billed monthly per engineer. Project delivery is scoped and estimated up front, with milestones agreed together.',
  },
  {
    q: 'Which time zones do you cover?',
    a: 'Our engineers are distributed worldwide. We agree on overlapping working hours with your team so there is always someone available for stand-ups, reviews, and incidents.',
  },
]
