"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, PersonStanding, Sword, Swords, Users, Zap, User, School } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { AdvancedCountdown } from "./advanced-countdown"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation';

export function TournamentHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const logoRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      // For background particles
      setMousePosition({ x: e.clientX, y: e.clientY })

      // For logo interaction
      if (!logoRef.current) return
      const rect = logoRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const router = useRouter();

  const scrollToRegistration = (type: 'individual' | 'school') => {
    if (typeof window !== "undefined" && (window as any).playClickSound) {
      ;(window as any).playClickSound()
    }
    router.push(`/#registration?type=${type}`);
    // document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="relative h-screen pt-40 pb-10 flex flex-col justify-center items-center text-center paint-splash overflow-hidden [perspective:1000px]">
        <motion.div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[10%] left-[10%] w-40 h-40 rounded-full bg-primary/15 blur-2xl float-animation-slow"
            style={{
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-secondary/15 blur-2xl float-animation-medium"
            style={{
              animationDelay: "1.5s",
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            }}
          ></div>
          <div
            className="absolute top-[30%] right-[10%] w-24 h-24 rounded-full bg-accent/10 blur-xl float-animation-fast"
            style={{
              animationDelay: "0.5s",
              transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-[10%] left-[20%] w-20 h-20 rounded-full bg-primary/10 blur-lg float-animation-medium"
            style={{
              animationDelay: "2.5s",
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            }}
          ></div>
          <div
            className="absolute top-[60%] left-[40%] w-28 h-28 rounded-full bg-secondary/10 blur-xl float-animation-slow"
            style={{
              animationDelay: "3s",
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-[40%] right-[30%] w-16 h-16 rounded-full bg-accent/5 blur-lg float-animation-fast"
            style={{
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-50"></div>
        </motion.div>

        <motion.div
          ref={logoRef}
          className="relative z-10"
          style={{ rotateX, rotateY }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
        >
          <div className="relative w-full max-w-md h-auto mx-auto"> {/* Added a wrapper div for responsive sizing */}
            <Image
              src="/Logo-dorado.webp"
              alt="Logo de la Asociacion Long Hu He"
              width={500}
              height={500}
              priority
              className="drop-shadow-lg"
            />
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 bg-background py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className={`text-5xl md:text-7xl lg:text-8xl font-normal mb-6 hero-text leading-normal transition-all duration-1000 font-marshathedead ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-foreground inline-block leading-normal`}
            >
              Torneo Abierto de
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-primary inline-block leading-normal`}
            >
              Artes Marciales
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`text-secondary inline-block leading-normal font-[var(--font-storm-gust)]`}
            >
              2025
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`text-3xl md:text-4xl mb-12 text-secondary font-normal font-marshathedead`}
          >
            Asociacion Long Hu He
          </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className={`grid md:grid-cols-3 gap-4 mb-6`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.03136, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)", transition: { duration: 0.05 } }}
                whileTap={{ scale: 0.92 }}
                className="bg-card/50 backdrop-blur-lg rounded-xl border border-border/30 p-4 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-7 h-7 text-primary" />
                <p className="text-base font-bold text-foreground">23 de noviembre</p>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              whileHover={{ scale: 1.03136, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)", transition: { duration: 0.05 } }}
              whileTap={{ scale: 0.92 }}
              className="bg-card/50 backdrop-blur-lg rounded-xl border border-border/30 p-4 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <Clock className="w-7 h-7 text-primary" />
              <p className="text-base font-bold text-foreground">10:00 hs</p>
            </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.03136, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)", transition: { duration: 0.05 } }}
                whileTap={{ scale: 0.92 }}
                className="bg-card/50 backdrop-blur-lg rounded-xl border border-border/30 p-4 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <MapPin className="w-7 h-7 text-primary" />
                <p className="text-base font-bold text-foreground">Club Independiente Burzaco</p>
              </motion.div>
            </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className={`text-lg mb-8 text-foreground max-w-2xl mx-auto`}
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Pellegrini 557, Burzaco - Abierto a todas las escuelas
          </motion.p>

          <div>
            <AdvancedCountdown />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-8"
          >
            <Button
              onClick={() => scrollToRegistration('individual')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-foreground px-8 py-6 text-xl font-bold glow-border transform transition-all duration-300 relative overflow-hidden group"
              onMouseEnter={() => {
                if (typeof window !== "undefined" && (window as any).playHoverSound) {
                  ;(window as any).playHoverSound()
                }
              }}
            >
              <span className="relative z-10 flex items-center gap-2"><User className="w-5 h-5" /> Inscripción Individual</span>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </Button>
            
          </motion.div>
        </div>
      </section>
    </>
  )
}