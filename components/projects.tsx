import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Rocket League ML Bot",
    desc:
      "Made a bot for Rocket League that used PPO to learn how to play. Placed 5th in the 24k magic championship. Where each bot was only allowed to have at most 24k parameters",
    img: "/green-computer-vision-neural-network.png",
    tags: ["Machine Learning", "RL", "PyTorch", "PPO", "RLGym"],
  },
  {
    title: "Imitation Learning in Rocket League",
    desc:
      "Made a bot for Rocket League that was trained using Behavioural Cloning",
    img: "/green-computer-vision-neural-network.png",
    tags: ["Machine Learning", "RL", "PyTorch", "PPO", "RLGym"],
  },
]

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Projects</h2>
      <p className="mt-2 max-w-3xl text-neutral-300">
        A selection of AI/ML work spanning research and production. Contact me for case studies and code walkthroughs.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <Card key={idx} className="border-neutral-800/60 bg-neutral-900/40 backdrop-blur">
            <CardHeader>
              {/* <CardTitle className="text-lg">{p.title}</CardTitle> this is bad, it should be black*/}
              <CardTitle className="text-lg text-neutral-300">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-3 overflow-hidden rounded-md border border-neutral-800/60">
                <Image
                  src={p.img || "/placeholder.svg"}
                  alt={`${p.title} preview image`}
                  width={1280}
                  height={640}
                  className="h-40 w-full object-cover"
                  priority={idx === 0}
                />
              </div>
              <p className="text-sm text-neutral-300">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
