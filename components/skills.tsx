import { Badge } from "@/components/ui/badge";

const groups = [
  {
    title: "Languages",
    items: [
      { name: "Python", level: "Advanced" },
      { name: "C++", level: "Familiar" },
      { name: "Rust", level: "Basic" },
    ],
  },
  {
    title: "Machine Learning",
    items: [
      { name: "PyTorch", level: "Advanced" },
      { name: "TensorFlow", level: "Familiar" },
      { name: "Keras", level: "Intermediate" },
      { name: "Gymnasium", level: "Basic" },
      { name: "Stable Baselines3", level: "Intermediate" },
      { name: "RLGym", level: "Advanced" },
    ],
  },
  {
    title: "GPU Programming",
    items: [
      { name: "CUDA", level: "Basic" },
      { name: "Triton", level: "Basic" },
    ],
  },
];

const levelColor = {
  Expert: "text-purple-300 border-purple-600/50",
  Advanced: "text-emerald-300 border-emerald-600/50",
  Intermediate: "text-blue-300 border-blue-600/50",
  Basic: "text-yellow-300 border-yellow-600/50",
  Familiar: "text-neutral-400 border-neutral-700",
};

export default function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Skills
      </h2>

      <p className="mt-2 max-w-3xl text-neutral-300">
        Tools and techniques I use end-to-end, from research to deployment.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur"
          >
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              {g.title}
            </h3>

            <div className="space-y-2">
              {g.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-md border border-neutral-800 px-3 py-2"
                >
                  <span>{item.name}</span>
                  <Badge
                    variant="outline"
                    className={
                      levelColor[item.level as keyof typeof levelColor]
                    }
                  >
                    {item.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
