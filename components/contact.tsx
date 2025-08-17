"use client"

import { useActionState, useEffect, useRef } from "react"
import { submitContact } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'

type State = {
  ok: boolean
  errors?: Record<string, string>
}

export default function Contact() {
  const initialState: State = { ok: false, errors: {} }
  const [state, formAction, pending] = useActionState(submitContact as any, initialState)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (state?.ok) {
      toast({
        title: "Thanks!",
        // description: "Your message was sent. I’ll get back to you soon.",
        description: "Message can't be sent, sorry, directly send the message to marticodev@gmail.com",
      })
      // reset the form
      formRef.current?.reset()
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast({
        title: "Please fix the errors",
        description: "Some fields are missing or invalid.",
        variant: "destructive",
      })
    }
  }, [state, toast])

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in touch</h2>
      <p className="mt-2 text-neutral-300">
        Interested in collaborating or hiring? Feel free to reach out — I’ll reply within 1–2 business days.
      </p>
      <p className="mt-2 text-neutral-300">
        Curently disabled, please, send an email directly to marticodev@gmail.com
      </p>

      <form ref={formRef} action={formAction} className="mt-6 grid gap-4 rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-neutral-200">
            Name
          </label>
          <Input id="name" name="name" placeholder="Joseph Shilling" className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
          {state?.errors?.name && <p className="text-sm text-red-400">{state.errors.name}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-neutral-200">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="you@domain.com" className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
          {state?.errors?.email && <p className="text-sm text-red-400">{state.errors.email}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm text-neutral-200">
            Message
          </label>
          <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project, timeline, and goals..." className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500" />
          {state?.errors?.message && <p className="text-sm text-red-400">{state.errors.message}</p>}
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            disabled={pending}
            className="bg-emerald-500 text-neutral-900 hover:bg-emerald-400"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
