import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-display text-6xl leading-none">
          This route isn’t <em className="text-copper">deployed.</em>
        </h1>
        <p className="mt-6 text-mute">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link to="/" className="btn-primary mt-10">
          Back to KRAFENIO{' '}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </main>
  )
}
