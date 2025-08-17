"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="#" className="group inline-flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold tracking-tight">
            {'<'}Martico2432{'>'} Portfolio
          </span>
        </Link>
        <div className="hidden items-center gap-2 sm:flex">
          <Link href="#projects" className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors">
            Skills
          </Link>
          <Link href="#research" className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors">
            Research
          </Link>
          <Link href="#contact" className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="icon" variant="ghost" className="text-neutral-300 hover:text-emerald-400">
            <a aria-label="GitHub" href="https://github.com/martico2432" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="icon" variant="ghost" className="text-neutral-300 hover:text-emerald-400">
            <a aria-label="Email" href="#contact">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
