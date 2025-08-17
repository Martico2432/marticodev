"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'

export default function Contact() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    // Remove this effect or update it to not depend on state and pending
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in touch</h2>
      <p className="mt-2 text-neutral-300">
        Interested in collaborating or hiring? Feel free to reach out — I’ll reply within 1–2 business days.
      </p>
      <p className="mt-2 text-neutral-300">
        Curently disabled, please, send an email directly to marticodev@gmail.com
      </p>

      <form ref={formRef} className="mt-6 grid gap-4 rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-neutral-200">
            Name
          </label>
          <Input id="name" name="name" placeholder="Joseph Shilling" className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-neutral-200">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="you@domain.com" className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm text-neutral-200">
            Message
          </label>
          <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project, timeline, and goals..." className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="bg-emerald-500 text-neutral-900 hover:bg-emerald-400"
          >
            Send message
          </Button>
        </div>
      </form>
    </div>
  )
}