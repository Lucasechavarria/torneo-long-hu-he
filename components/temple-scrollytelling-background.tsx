"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useSpring, useTransform, motion } from "framer-motion"
import Image from "next/image"

// Imagen maestra de alta definición del templo tradicional Shaolin
const TEMPLE_MASTER_IMAGE = "/temple-sequence/step-1.jpg"

export function TempleScrollytellingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Detección reactiva de vista móvil (< 768px)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Hook de progreso de scroll con física de inercia y amortiguación fluida
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  })

  // 1. ZOOM GRADUAL CONTINUO
  // En escritorio: 1.0x a 2.25x. En móviles: limitado a 1.0x a 1.30x para mantener siempre el templo majestuoso y visible
  const desktopZoom = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1.0, 1.45, 1.85, 2.25])
  const mobileZoom = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1.0, 1.10, 1.20, 1.30])
  const cameraZoom = isMobile ? mobileZoom : desktopZoom

  // 2. TRAYECTORIA Y DESPLAZAMIENTO DEL ENFOQUE (X, Y)
  // Anclado en la pagoda y escalinata principal del templo
  const desktopPanX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["0%", "-3.5%", "-7%", "-10%"])
  const mobilePanX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["0%", "-1%", "-2%", "-2%"])
  const cameraPanX = isMobile ? mobilePanX : desktopPanX

  const desktopPanY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["0%", "-4%", "-6%", "-7.5%"])
  const mobilePanY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], ["0%", "-2%", "-3.5%", "-5%"])
  const cameraPanY = isMobile ? mobilePanY : desktopPanY

  // 3. CAMBIO GRADUAL DEL ÁNGULO DE VISTA (Rotación 3D)
  const desktopRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, 2.8, 1.5, -2.0])
  const mobileRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, 1.2, 0.6, -0.8])
  const cameraRotateX = isMobile ? mobileRotateX : desktopRotateX

  const desktopRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, -1.8, -1.2, 0])
  const mobileRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, -0.6, -0.3, 0])
  const cameraRotateY = isMobile ? mobileRotateY : desktopRotateY

  // Seguimiento suave del cursor del mouse para micro-paralaje 3D interactivo (en escritorio)
  useEffect(() => {
    let animationFrameId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      // Coordenadas normalizadas (-1 a 1)
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const animateMouse = () => {
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      setMouseOffset({ x: currentX * 12, y: currentY * 8 })
      animationFrameId = requestAnimationFrame(animateMouse)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(animateMouse)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Contenedor del Templo 3D con aceleración por GPU */}
      <motion.div
        className="relative w-full h-full origin-center will-change-transform"
        style={{
          scale: cameraZoom,
          x: cameraPanX,
          y: cameraPanY,
          rotateX: cameraRotateX,
          rotateY: cameraRotateY,
          translateX: mouseOffset.x,
          translateY: mouseOffset.y,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={TEMPLE_MASTER_IMAGE}
          alt="Templo Tradicional Shaolin Torneo 2026"
          fill
          priority
          quality={95}
          onLoad={() => setIsLoaded(true)}
          className={`object-cover ${isMobile ? "object-[50%_35%]" : "object-center"} scale-105 transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>

      {/* Niebla volumétrica sutil en el valle que flota y se desliza con el scroll */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.7, 0.85]),
        }}
      />

      {/* Capa de contraste cinematográfico para garantizar 100% de legibilidad del texto */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Gradiente superior para fundir con el header */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-transparent h-48 pointer-events-none" />

      {/* Gradiente inferior para asentar la base de la página */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent h-64 pointer-events-none" />

      {/* Resplandor radial marcial tenue (Qi rojo y ámbar tradicional) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-red-900/10 to-transparent pointer-events-none" />
    </div>
  )
}
