import { ExternalLink } from 'lucide-react'
import Link from "next/link"

const pubs = [
  {
    title: "Attention-enhanced CNNs for Real-time Quality Inspection",
    venue: "ICCV Workshop, 2024",
    link: "https://example.com/publication-1",
    summary: "Proposes a lightweight attention module that boosts detection fidelity under latency constraints.",
  },
]

export default function Publications() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Research & Publications</h2>
      <p className="mt-2 max-w-3xl text-neutral-300">
        Selected research and writing. I can share preprints and implementation details upon request.
      </p>

      <div className="mt-6 space-y-5">
        {pubs.map((p) => (
          <article key={p.title} className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur">
            <h3 className="text-lg font-medium">
              <Link href={p.link} target="_blank" rel="noreferrer" className="hover:text-emerald-400">
                {p.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-neutral-400">{p.venue}</p>
            <p className="mt-2 text-neutral-300">{p.summary}</p>
            <div className="mt-3">
              <Link
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200"
                aria-label={`Open ${p.title} in a new tab`}
              >
                Read more <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
