import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-900/60 bg-neutral-950/80">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Marti Compañó. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#projects" className="text-neutral-400 hover:text-emerald-400">
              Projects
            </Link>
            <Link href="#skills" className="text-neutral-400 hover:text-emerald-400">
              Skills
            </Link>
            <Link href="#research" className="text-neutral-400 hover:text-emerald-400">
              Research
            </Link>
            <Link href="#contact" className="text-neutral-400 hover:text-emerald-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
