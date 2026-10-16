"use client"
import { useEffect, useRef } from "react"

interface Petal {
  type: "petal" | "ember"
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  swingAmplitude: number
  swingSpeed: number
  swingAngle: number
  color: string
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Crimson blossom petals & golden martial embers
    const particles: Petal[] = []
    const totalPetals = Math.min(35, Math.floor(width / 40))
    const totalEmbers = Math.min(25, Math.floor(width / 50))

    const petalColors = [
      "rgba(197, 22, 29, 0.75)",
      "rgba(168, 23, 29, 0.7)",
      "rgba(220, 38, 38, 0.65)",
      "rgba(139, 14, 20, 0.8)",
    ]

    const emberColors = [
      "rgba(245, 183, 49, 0.85)",
      "rgba(255, 215, 0, 0.8)",
      "rgba(251, 191, 36, 0.75)",
    ]

    // Create Petals
    for (let i = 0; i < totalPetals; i++) {
      particles.push({
        type: "petal",
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.3 + Math.random() * 0.7,
        vy: 0.8 + Math.random() * 1.2,
        size: 5 + Math.random() * 7,
        opacity: 0.35 + Math.random() * 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swingAmplitude: 1 + Math.random() * 2,
        swingSpeed: 0.02 + Math.random() * 0.03,
        swingAngle: Math.random() * Math.PI * 2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      })
    }

    // Create Embers
    for (let i = 0; i < totalEmbers; i++) {
      particles.push({
        type: "ember",
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.5 + Math.random() * 1.0), // float upwards
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.6,
        rotation: 0,
        rotationSpeed: 0,
        swingAmplitude: 0.5 + Math.random() * 1,
        swingSpeed: 0.03 + Math.random() * 0.04,
        swingAngle: Math.random() * Math.PI * 2,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
      })
    }

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity

      // Organic curved petal shape
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.6, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    const drawEmber = (p: Petal) => {
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color
      ctx.shadowColor = "#f5b731"
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.swingAngle += p.swingSpeed
        const swing = Math.sin(p.swingAngle) * p.swingAmplitude

        if (p.type === "petal") {
          p.x += p.vx + swing * 0.3
          p.y += p.vy
          p.rotation += p.rotationSpeed

          // Wrap edges
          if (p.y > height + 20) {
            p.y = -20
            p.x = Math.random() * width
          }
          if (p.x > width + 20) {
            p.x = -20
          }

          drawPetal(p)
        } else {
          // Ember floats upwards
          p.x += p.vx + swing * 0.2
          p.y += p.vy

          if (p.y < -20) {
            p.y = height + 20
            p.x = Math.random() * width
          }
          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20

          drawEmber(p)
        }
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-80"
      style={{ background: "transparent" }}
    />
  )
}

