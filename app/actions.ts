"use server"

export async function submitContact(prevState: any, formData: FormData) {
  // In a real app, send an email or store this in a DB.
  // For now, just log safely on the server.
  const name = (formData.get("name") as string | null) ?? ""
  const email = (formData.get("email") as string | null) ?? ""
  const message = (formData.get("message") as string | null) ?? ""

  console.log("[Contact] submission:", { name, email, message, at: new Date().toISOString() })

  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 600))

  // Basic validation result
  const errors: Record<string, string> = {}
  if (!name.trim()) errors.name = "Please enter your name."
  if (!email.trim() || !/.+@.+/.test(email)) errors.email = "Please enter a valid email."
  if (!message.trim()) errors.message = "Please enter a message."

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, errors: {} }
}
