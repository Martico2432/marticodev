import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from 'lucide-react'
import NNBackground from "@/components/nn-background"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Publications from "@/components/publications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100">
      {/* Animated neural net background */}
      <NNBackground />

      {/* Subtle grid + vignette overlays for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,149,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_45%)]" />
      </div>

      <Header />

      <div className="relative z-10">
        <Hero />
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>
        <section id="research" className="scroll-mt-24">
          <Publications />
        </section>
        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  )
}
