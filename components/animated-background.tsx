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
    let width = window.innerWidth
    let height = window.innerHeight
    const isMobile = width < 768

    // En pantallas Retina móviles calibramos DPR, en escritorio mantenemos tamaño 1:1 nativo original
    let dpr = isMobile ? Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2) : 1

    // Brisa al tacto (Touch Breeze) exclusiva para pantallas táctiles móviles
    let breezeX = 0
    let breezeY = 0
    let lastTouchX = 0
    let lastTouchY = 0

    const updateCanvasDimensions = () => {
      width = window.innerWidth
      height = window.innerHeight
      const currentIsMobile = width < 768
      dpr = currentIsMobile ? Math.min(window.devicePixelRatio || 1, 2) : 1
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    updateCanvasDimensions()

    const handleResize = () => {
      updateCanvasDimensions()
    }

    // Touch breeze event handlers (solo activos con gestos táctiles en móvil)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchX = e.touches[0].clientX
        lastTouchY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const dx = touch.clientX - lastTouchX
        const dy = touch.clientY - lastTouchY
        // Aceleración suave en la dirección del desplazamiento táctil
        breezeX += Math.max(-2, Math.min(2, dx * 0.06))
        breezeY += Math.max(-2, Math.min(2, dy * 0.06))
        lastTouchX = touch.clientX
        lastTouchY = touch.clientY
      }
    }

    window.addEventListener("resize", handleResize)
    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
    }

    // Densidad: en escritorio idéntica al original; en móvil mínimo 22 pétalos y 18 chispas
    const totalPetals = isMobile ? 22 : Math.min(35, Math.floor(width / 40))
    const totalEmbers = isMobile ? 18 : Math.min(25, Math.floor(width / 50))

    const petalColors = [
      "rgba(220, 38, 38, 0.85)",
      "rgba(200, 16, 46, 0.90)",
      "rgba(185, 28, 28, 0.85)",
      "rgba(239, 68, 68, 0.80)",
      "rgba(153, 27, 27, 0.95)",
    ]

    const emberColors = [
      "rgba(255, 215, 0, 0.95)",
      "rgba(245, 183, 49, 0.90)",
      "rgba(251, 191, 36, 0.85)",
    ]

    const particles: Petal[] = []

    // Crear Pétalos
    for (let i = 0; i < totalPetals; i++) {
      particles.push({
        type: "petal",
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.3 + Math.random() * 0.7,
        vy: 0.8 + Math.random() * 1.2,
        size: isMobile ? 6 + Math.random() * 6.5 : 5 + Math.random() * 7,
        opacity: 0.4 + Math.random() * 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swingAmplitude: 1 + Math.random() * 2,
        swingSpeed: 0.02 + Math.random() * 0.03,
        swingAngle: Math.random() * Math.PI * 2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      })
    }

    // Crear Chispas Doradas (Embers)
    for (let i = 0; i < totalEmbers; i++) {
      particles.push({
        type: "ember",
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.5 + Math.random() * 1.0),
        size: isMobile ? 1.8 + Math.random() * 2.5 : 1.5 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.55,
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

      // Curva orgánica de pétalo de flor de ciruelo / cerezo oriental
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.6, p.size * 0.95, p.size * 0.6, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.95, p.size * 0.6, -p.size * 0.85, -p.size * 0.6, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    const drawEmber = (p: Petal) => {
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color
      ctx.shadowColor = "#f5b731"
      ctx.shadowBlur = isMobile ? 10 : 8
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      // Limpiar en coordenadas nativas de alta resolución
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Guardar contexto y escalar por DPR para resolución Retina
      ctx.save()
      ctx.scale(dpr, dpr)

      // Amortiguación suave de la brisa al tacto
      breezeX *= 0.93
      breezeY *= 0.93

      particles.forEach((p) => {
        p.swingAngle += p.swingSpeed
        const swing = Math.sin(p.swingAngle) * p.swingAmplitude

        if (p.type === "petal") {
          p.x += p.vx + swing * 0.35 + breezeX
          p.y += p.vy + breezeY * 0.5
          p.rotation += p.rotationSpeed

          // Envoltura de bordes con margen de seguridad
          if (p.y > height + 25) {
            p.y = -25
            p.x = Math.random() * width
          }
          if (p.y < -30) {
            p.y = height + 20
          }
          if (p.x > width + 25) {
            p.x = -25
          }
          if (p.x < -25) {
            p.x = width + 25
          }

          drawPetal(p)
        } else {
          // Chispa asciende con vaivén dorado y reacciona a la brisa
          p.x += p.vx + swing * 0.25 + breezeX * 0.7
          p.y += p.vy + breezeY * 0.8

          if (p.y < -25) {
            p.y = height + 25
            p.x = Math.random() * width
          }
          if (p.y > height + 30) {
            p.y = -20
          }
          if (p.x < -25) p.x = width + 25
          if (p.x > width + 25) p.x = -25

          drawEmber(p)
        }
      })

      ctx.restore()
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90"
      style={{ background: "transparent" }}
    />
  )
}

