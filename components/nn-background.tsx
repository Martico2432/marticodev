"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  activation: number // 0..1
  outEdges: number[] // indices in edges
  inEdges: number[]
}

type Edge = {
  from: number
  to: number
  weight: number // -1..1
  activity: number // 0..1 glow
  length: number
}

type Pulse = {
  edgeIndex: number
  t: number // 0..1 along the edge
  speed: number
  hue: number
  life: number
  forward: boolean
}

export default function NNBackground({
  layers = 6,
  nodesPerLayer = [6, 8, 10, 8, 6, 4],
  maxEdgesPerNode = 4,
  seed = 42,
  saturation = 100,
  lightness = 55,
  alpha = 0.12,
  alwaysAnimate = false, // new
}: {
  layers?: number
  nodesPerLayer?: number[]
  maxEdgesPerNode?: number
  seed?: number
  saturation?: number
  lightness?: number
  alpha?: number
  alwaysAnimate?: boolean
} = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d", { alpha: true })!

    let width = 0
    let height = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const animate = alwaysAnimate || !prefersReducedMotion

    // PRNG
    let s = seed >>> 0
    const rnd = () => {
      s ^= s << 13
      s ^= s >>> 17
      s ^= s << 5
      return ((s >>> 0) / 0xffffffff)
    }

    let nodes: Node[] = []
    let edges: Edge[] = []
    let pulses: Pulse[] = []
    let targetPulseCount = 0 // maintain a minimum steady-state number of pulses

    function resize() {
      const { innerWidth, innerHeight } = window
      width = innerWidth
      height = innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGraph()
    }

    function buildGraph() {
      nodes = []
      edges = []
      pulses = []

      const L = layers
      const npl = nodesPerLayer.length === L ? nodesPerLayer : Array.from({ length: L }, (_, i) => 6 + ((i * 2) % 6))

      const marginX = Math.max(48, width * 0.08)
      const marginY = Math.max(64, height * 0.08)
      const layerGap = (width - marginX * 2) / Math.max(1, L - 1)

      const layerNodeIndices: number[][] = []
      for (let li = 0; li < L; li++) {
        const count = npl[li]
        const columnX = marginX + li * layerGap
        const col: number[] = []
        for (let i = 0; i < count; i++) {
          const y = marginY + (i + 0.5) * ((height - marginY * 2) / count)
          const jitterX = (rnd() - 0.5) * Math.min(24, layerGap * 0.15)
          const jitterY = (rnd() - 0.5) * Math.min(18, (height / count) * 0.2)
          const nodeIndex = nodes.length
          nodes.push({
            x: columnX + jitterX,
            y: y + jitterY,
            activation: rnd() * 0.2,
            outEdges: [],
            inEdges: [],
          })
          col.push(nodeIndex)
        }
        layerNodeIndices.push(col)
      }

      for (let li = 0; li < L - 1; li++) {
        const srcs = layerNodeIndices[li]
        const dsts = layerNodeIndices[li + 1]

        for (const si of srcs) {
          const choices = dsts
            .map((di) => {
              const dy = Math.abs(nodes[si].y - nodes[di].y)
              const proximity = Math.exp(-dy / 140)
              const chance = proximity * (0.5 + rnd() * 0.6)
              return { di, chance }
            })
            .filter(() => rnd() < 0.9)
            .sort((a, b) => b.chance - a.chance)
            .slice(0, Math.max(1, Math.floor(1 + rnd() * maxEdgesPerNode)))

          for (const { di } of choices) {
            const weight = (rnd() * 2 - 1)
            const from = si
            const to = di
            const dx = nodes[to].x - nodes[from].x
            const dy = nodes[to].y - nodes[from].y
            const length = Math.hypot(dx, dy)
            const edgeIndex = edges.length
            edges.push({
              from,
              to,
              weight,
              activity: rnd() * 0.15,
              length,
            })
            nodes[from].outEdges.push(edgeIndex)
            nodes[to].inEdges.push(edgeIndex)
          }
        }
      }

      // dynamic target based on viewport area
      const base = Math.floor(24 + Math.min(48, (width * height) / 48000))
      targetPulseCount = base

      // seed initial pulses
      for (let i = 0; i < Math.floor(base * 0.85); i++) spawnPulse(true)
      for (let i = 0; i < Math.floor(base * 0.35); i++) spawnPulse(false)
    }

    function spawnPulse(forward: boolean) {
      if (edges.length === 0) return
      let candidates: number[]
      if (forward) {
        const cap = Math.max(1, Math.floor(edges.length * 0.55))
        candidates = Array.from({ length: cap }, (_, i) => i)
      } else {
        const start = Math.max(0, Math.floor(edges.length * 0.45))
        candidates = Array.from({ length: edges.length - start }, (_, i) => start + i)
      }
      const edgeIndex = candidates[Math.floor(rnd() * candidates.length)]
      pulses.push({
        edgeIndex,
        t: rnd(),
        speed: 0.003 + rnd() * 0.009,
        hue: forward ? 145 + rnd() * 20 : 160 + rnd() * 10,
        life: 1,
        forward,
      })
    }

    let last = performance.now()

    function tick(now: number) {
      const dt = Math.min(50, now - last)
      last = now

      ctx.clearRect(0, 0, width, height)

      // subtle trail
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = `rgba(0,0,0,${animate ? 0.12 : 1})`
      ctx.fillRect(0, 0, width, height)

      const time = now * 0.001

      // helper to get jittered node pos for this frame (soft breathing)
      function jitter(i: number) {
        const jx = Math.sin(time * 0.8 + i * 1.7) * 1.2 + Math.cos(time * 0.3 + i * 0.9) * 0.8
        const jy = Math.cos(time * 0.6 + i * 1.3) * 1.2 + Math.sin(time * 0.4 + i * 0.7) * 0.8
        return [jx, jy] as const
      }

      // draw edges
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i]
        const a = nodes[e.from]
        const b = nodes[e.to]
        const [ajx, ajy] = jitter(e.from)
        const [bjx, bjy] = jitter(e.to)
        const ax = a.x + ajx
        const ay = a.y + ajy
        const bx = b.x + bjx
        const by = b.y + bjy

        const weightAlpha = 0.12 + Math.abs(e.weight) * 0.18
        const activityAlpha = e.activity * 0.6
        const lineAlpha = Math.min(0.38, alpha + weightAlpha + activityAlpha)

        ctx.strokeStyle = `hsla(150, ${saturation}%, ${lightness - 10}%, ${lineAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      }

      // update and draw pulses (continuous)
      if (animate) {
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]
          const e = edges[p.edgeIndex]
          const a = nodes[e.from]
          const b = nodes[e.to]
          const [ajx, ajy] = jitter(e.from)
          const [bjx, bjy] = jitter(e.to)
          const ax = a.x + ajx
          const ay = a.y + ajy
          const bx = b.x + bjx
          const by = b.y + bjy

          const dist = Math.hypot(bx - ax, by - ay) || 1
          const speed = p.speed * (1 + e.activity * 0.4) * (dist / (e.length || dist)) // normalize if jitter changes length slightly
          p.t += (p.forward ? 1 : -1) * speed * dt

          const t = Math.max(0, Math.min(1, p.t))
          const x = ax + (bx - ax) * t
          const y = ay + (by - ay) * t

          const glow = 0.35 + e.activity * 0.4
          const size = 1.5 + 2.5 * glow
          ctx.shadowBlur = 12 * glow
          ctx.shadowColor = `hsla(${p.hue}, 100%, ${lightness + 10}%, ${0.55 + glow * 0.35})`
          ctx.fillStyle = `hsla(${p.hue}, 100%, ${lightness + 12}%, ${0.9})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          e.activity = Math.min(1, e.activity * 0.96 + 0.02)
          nodes[p.forward ? e.to : e.from].activation = Math.min(1, nodes[p.forward ? e.to : e.from].activation * 0.9 + 0.25)

          // edge transition
          if (p.t >= 1 || p.t <= 0) {
            const head = p.forward ? e.to : e.from
            const options = p.forward ? nodes[head].outEdges : nodes[head].inEdges
            if (options.length > 0) {
              p.edgeIndex = options[Math.floor(rnd() * options.length)]
              p.t = p.forward ? 0 : 1
            } else {
              pulses.splice(i, 1)
            }
          }

          // life decay and replace
          p.life -= 0.0007 * dt
          if (p.life <= 0) {
            pulses.splice(i, 1)
          }
        }

        // maintain minimum pulse population so animation never stops
        while (pulses.length < targetPulseCount) {
          spawnPulse(rnd() < 0.75) // mostly forward, some backprop
        }
      } else {
        // static frame: still draw a faint node glow
      }

      // draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.activation *= 0.94
        const [jx, jy] = jitter(i)
        const nx = n.x + jx
        const ny = n.y + jy
        const baseL = lightness
        const glowAlpha = animate ? Math.min(0.8, 0.2 + n.activation * 0.8) : 0.15
        const r = 2.2 + n.activation * 2.8

        ctx.fillStyle = `hsla(150, ${saturation}%, ${baseL + 8}%, ${0.35 + n.activation * 0.5})`
        ctx.beginPath()
        ctx.arc(nx, ny, r, 0, Math.PI * 2)
        ctx.fill()

        if (animate) {
          ctx.shadowBlur = 18 * glowAlpha
          ctx.shadowColor = `hsla(150, 100%, ${baseL + 14}%, ${glowAlpha})`
          ctx.beginPath()
          ctx.arc(nx, ny, r * 0.8, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    resize()
    if (animate) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      // render one static frame for reduced motion (unless alwaysAnimate)
      last = performance.now()
      tick(performance.now())
    }

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [alpha, alwaysAnimate, layers, lightness, maxEdgesPerNode, nodesPerLayer, saturation, seed])

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full"
      />
    </div>
  )
}
