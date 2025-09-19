"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from 'next/navigation';

export function TournamentHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToRegistration = () => {
    if (typeof window !== "undefined" && (window as any).playClickSound) {
      ;(window as any).playClickSound()
    }
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center py-1">
        <div className="flex items-center space-x-2 mb-2 md:mb-0"> {/* Added margin-bottom for spacing when stacked */}
          <Image
            src="/Logo-dorado.webp"
            alt="Logo de la Asociacion Long Hu He"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 md:w-16 md:h-16" // Responsive image size
          />
          <Image
            src="/logo-dorado.png"
            alt="Asociacion Long Hu He"
            width={120}
            height={30}
            className="h-auto" // Responsive image size
          />
        </div>
        <motion.div className="relative hidden sm:block"> {/* Added relative positioning for glow and hidden on small screens */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.02, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
          >
            <Button
              onClick={scrollToRegistration}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base md:px-10 md:py-5 md:text-xl font-semibold glow-border shadow-xl" // Responsive padding and font size
            >
              Inscripción
            </Button>
          </motion.div>
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl -z-10" // Changed to rounded-full for a circular glow
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </header>
  )
}
