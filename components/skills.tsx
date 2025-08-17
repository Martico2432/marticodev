import { Badge } from "@/components/ui/badge"

const groups = [
  {
    title: "Languages",
    items: ["Python"],
  },
  {
    title: "Frameworks",
    items: ["PyTorch", "TensorFlow", "Keras", "Stable Baselines 3", "Gymnasium", "rlgym-ppo", "RLGym"],
  },
]

export default function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Skills</h2>
      <p className="mt-2 max-w-3xl text-neutral-300">Tools and techniques I use end-to-end, from research to deployment.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Badge key={item} variant="outline" className="border-emerald-600/50 text-emerald-300">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
