"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles, MapPin, Trophy, Users, UserPlus } from "lucide-react"

export function TournamentHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined" && (window as any).playClickSound) {
      ;(window as any).playClickSound()
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl py-2"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Association Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <Image
              src="/Logo-dorado.webp"
              alt="Logo Asociación Long Hu He"
              width={48}
              height={48}
              className="rounded-full w-10 h-10 md:w-12 md:h-12 border border-amber-500/40 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#FFF1B9] font-cinzel uppercase">
              Asociación Long Hu He
            </span>
            <span className="text-xs tracking-[0.3em] text-[#D4AF37] font-yuji-boku font-normal">
              龍虎鶴
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs md:text-sm font-cinzel font-semibold tracking-wider">
          <button
            onClick={() => scrollToSection("disciplinas")}
            className="text-[#FDFDFD]/80 hover:text-[#FFF1B9] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            Disciplinas
          </button>
          <button
            onClick={() => scrollToSection("sede")}
            className="text-[#FDFDFD]/80 hover:text-[#FFF1B9] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            Sede
          </button>
          <button
            onClick={() => scrollToSection("registration")}
            className="text-[#FDFDFD]/80 hover:text-[#FFF1B9] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            Inscripción
          </button>
        </nav>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            onClick={() => scrollToSection("registration")}
            className="btn-martial-primary px-4 py-2 md:px-5 md:py-2.5 text-xs font-bold tracking-wider cursor-pointer shadow-lg"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Inscripción 2026
          </Button>
          <motion.div
            className="absolute inset-0 bg-[#C8102E]/20 blur-md -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </header>
  )
}

