import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from 'lucide-react'
import Link from "next/link"

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:pt-16 sm:pb-12 md:pt-20 lg:pt-24 lg:pb-16"
    >
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-300/90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
          Machine Learning • Deep Learning • MLOps
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Building intelligent systems with a green neural core
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-neutral-300 sm:text-lg">
          I design, train, and deploy neural networks that solve real-world problems.
          My focus is on Performance, interpretability, and optimization.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-emerald-500 text-neutral-900 hover:bg-emerald-400">
            <Link href="#projects">
              View projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {/* <Button asChild size="lg" variant="outline" className="border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/10">
            <a href="/resume.pdf" download>
              Download Resume <Download className="ml-2 h-4 w-4" />
            </a>
          </Button> */}
        </div>
      </div>
    </section>
  )
}
