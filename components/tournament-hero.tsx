"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, UserPlus, Trophy, Navigation } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { AdvancedCountdown } from "./advanced-countdown"
import { useIsMobile } from "@/hooks/use-mobile"

export function TournamentHero() {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const logoRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), {
    stiffness: 280,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), {
    stiffness: 280,
    damping: 25,
  })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (!logoRef.current) return
      const rect = logoRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, isMobile])

  const scrollTo = (id: string) => {
    if (typeof window !== "undefined" && (window as any).playClickSound) {
      ;(window as any).playClickSound()
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="relative min-h-[90vh] pt-28 pb-14 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Subtle hero martial ambient radial glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Subtle decorative glowing martial circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[15%] left-[8%] w-60 h-60 rounded-full bg-red-600/15 blur-3xl float-animation-slow"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <div
            className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-amber-500/15 blur-3xl float-animation-medium"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            }}
          />
        </div>

        {/* School Logo & Vertical Right Margin Ideograms */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center my-2">
          {/* Central Logo: En móvil levitación y respiración continua; en escritorio inclinación 3D reactiva al mouse */}
          {isMobile ? (
            <motion.div
              ref={logoRef}
              className="cursor-pointer relative"
              animate={{
                y: [-6, 6, -6],
                rotateZ: [-1.2, 1.2, -1.2],
                filter: [
                  "drop-shadow(0 12px 28px rgba(212,175,55,0.40))",
                  "drop-shadow(0 18px 42px rgba(212,175,55,0.70))",
                  "drop-shadow(0 12px 28px rgba(212,175,55,0.40))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] mx-auto">
                <Image
                  src="/Logo-dorado.webp"
                  alt="Logo oficial de la Asociación Long Hu He"
                  width={540}
                  height={540}
                  priority
                  className="drop-shadow-[0_15px_35px_rgba(212,175,55,0.45)] object-contain w-full h-full"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              ref={logoRef}
              className="cursor-pointer"
              style={{ rotateX, rotateY }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] mx-auto">
                <Image
                  src="/Logo-dorado.webp"
                  alt="Logo oficial de la Asociación Long Hu He"
                  width={540}
                  height={540}
                  priority
                  className="drop-shadow-[0_15px_35px_rgba(212,175,55,0.45)] object-contain w-full h-full"
                />
              </div>
            </motion.div>
          )}

          {/* Vertical Ideograms at Logo Height on Right Margin: Dragón (龍), Tigre (虎), Grulla (鶴) */}
          <div className="absolute right-3 sm:right-6 md:right-10 lg:right-14 xl:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none z-20">
            {isMobile ? (
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 2px 10px rgba(212,175,55,0.45))",
                    "drop-shadow(0 2px 22px rgba(255,215,0,0.85))",
                    "drop-shadow(0 2px 10px rgba(212,175,55,0.45))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2 sm:gap-4 md:gap-5 font-yuji-boku text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFF1B9] drop-shadow-[0_2px_14px_rgba(212,175,55,0.55)] leading-tight"
              >
                <span title="Dragón (Lóng)">龍</span>
                <span title="Tigre (Hǔ)">虎</span>
                <span title="Grulla (Hè)">鶴</span>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-5 font-yuji-boku text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFF1B9] drop-shadow-[0_2px_14px_rgba(212,175,55,0.55)] leading-tight">
                <span title="Dragón (Lóng)">龍</span>
                <span title="Tigre (Hǔ)">虎</span>
                <span title="Grulla (Hè)">鶴</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Typography with unified martial font */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 mt-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="leading-tight text-center">
              {/* Torneo Abierto: Martial Calligraphy Brush Font with gold metallic gradient */}
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-marshathedead gold-metallic-text tracking-wider inline-block px-4 sm:px-8 py-1 uppercase drop-shadow-[0_4px_25px_rgba(212,175,55,0.45)] select-none">
                Torneo Abierto
              </span>
              {/* De Artes Marciales: Same typography and metallic gold with flanking divider rules */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 my-1 sm:my-2">
                <span className="h-[2px] w-6 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FFF1B9] rounded-full" />
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-marshathedead gold-metallic-text tracking-wide uppercase drop-shadow-[0_3px_18px_rgba(212,175,55,0.4)] select-none">
                  De Artes Marciales
                </span>
                <span className="h-[2px] w-6 sm:w-16 md:w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#FFF1B9] rounded-full" />
              </div>
            </h1>
          </motion.div>

          {/* Martial Blood Brush Stroke Banner for Date (Simulating authentic martial ink/blood splash) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="my-6 max-w-3xl mx-auto w-full px-2"
          >
            <div className="relative py-5 sm:py-7 px-6 sm:px-14 flex flex-col items-center justify-center text-center">
              {/* High-Fidelity Photorealistic Blood Brush Stroke Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center -z-10 overflow-visible">
                {/* Deep Arterial Red Ambient Glow */}
                <div className="absolute inset-x-8 inset-y-4 bg-[#C8102E]/30 blur-2xl rounded-full" />

                {/* Authentic Blood Brush Asset with Bristles & Splatters */}
                <div className="relative w-[115%] sm:w-[110%] md:w-[105%] h-[150%] sm:h-[165%] md:h-[180%] -my-4">
                  <Image
                    src="/blood-brush-banner.png"
                    alt="Pincelada de sangre marcial"
                    fill
                    priority
                    quality={95}
                    className="object-contain object-center drop-shadow-[0_8px_25px_rgba(200,16,46,0.5)] select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Banner Content */}
              <div className="relative z-10 py-1">
                {/* DOMINGO */}
                <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] uppercase text-[#FFF1B9] font-cinzel mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  DOMINGO
                </p>

                {/* 22 DE NOVIEMBRE */}
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide sm:tracking-wider text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] font-sans my-0.5 select-none">
                  22 DE NOVIEMBRE
                </div>

                {/* — 2026 — */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-1">
                  <span className="h-[2px] w-8 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-300 rounded-full" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(245,183,49,0.5)] font-sans">
                    2026
                  </span>
                  <span className="h-[2px] w-8 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-300 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Quick Pills with Straight Corners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="chinese-card-straight p-3.5 sm:p-4 flex items-center justify-center gap-3 cursor-default"
            >
              <Calendar className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-left font-montserrat">
                <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold tracking-wider">Fecha</span>
                <span className="text-sm sm:text-base font-bold text-[#FDFDFD]">22 Noviembre 2026</span>
              </div>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.96 }}
              className="chinese-card-straight p-3.5 sm:p-4 flex items-center justify-center gap-3 cursor-default"
            >
              <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-left font-montserrat">
                <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold tracking-wider">Horario</span>
                <span className="text-sm sm:text-base font-bold text-[#FDFDFD]">10:00 hs</span>
              </div>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("sede")}
              className="chinese-card-straight p-3.5 sm:p-4 flex items-center justify-center gap-3 cursor-pointer hover:border-[#FFF1B9] transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-left font-montserrat">
                <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold tracking-wider">Sede Oficial</span>
                <span className="text-sm sm:text-base font-bold text-[#FDFDFD]">Club Alberdi de Burzaco</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Venue Address & Welcome Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xs sm:text-sm text-[#FDFDFD]/90 max-w-xl mx-auto mb-4 font-montserrat"
          >
            <span className="text-[#D4AF37] font-semibold">Int. C. Amenedo 280 — Burzaco</span>, Provincia de Buenos Aires
            <br />
            <span className="text-[#FFF1B9]/80 text-xs">Abierto a todas las escuelas y estilos marciales</span>
          </motion.p>

          {/* Countdown Component */}
          <AdvancedCountdown />

          {/* Official Motto from Flyer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="my-5 max-w-4xl mx-auto px-6 py-3 bg-black/80 border border-[#D4AF37]/40 text-[#FFF1B9] text-xs sm:text-sm md:text-base text-center italic font-montserrat shadow-lg relative"
          >
            "Con honor, respeto y espíritu marcial, los esperamos para compartir juntos este encuentro."
          </motion.div>

          {/* Action CTAs aligned with UI/UX Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 w-full max-w-sm sm:max-w-none mx-auto"
          >
            {/* Primary Action Button: Crimson with gold border & Cinzel font */}
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                onClick={() => scrollTo("registration")}
                size="lg"
                className="btn-martial-primary w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base cursor-pointer shadow-xl flex items-center justify-center"
              >
                <UserPlus className="w-5 h-5 mr-2 shrink-0" />
                Inscribirse al Torneo
              </Button>
            </motion.div>

            {/* Secondary Action Button: Transparent with gold border & Cinzel font */}
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                onClick={() => scrollTo("disciplinas")}
                size="lg"
                className="btn-martial-secondary w-full sm:w-auto px-6 sm:px-7 py-5 sm:py-6 text-sm sm:text-base cursor-pointer flex items-center justify-center"
              >
                <Trophy className="w-5 h-5 mr-2 text-[#D4AF37] shrink-0" />
                Ver Disciplinas
              </Button>
            </motion.div>

            {/* Sede CTA */}
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                onClick={() => scrollTo("sede")}
                size="lg"
                className="bg-black/70 hover:bg-[#7A0010]/40 text-[#FFF1B9] border border-[#D4AF37]/50 font-cinzel text-xs sm:text-sm px-6 py-5 sm:py-6 cursor-pointer flex items-center justify-center gap-2 transition-all uppercase tracking-wider w-full sm:w-auto"
              >
                <Navigation className="w-4 h-4 text-[#C8102E] shrink-0" />
                Cómo Llegar
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}