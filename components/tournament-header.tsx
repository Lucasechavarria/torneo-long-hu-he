"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function TournamentHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/Logo-dorado.webp"
            alt="Logo de la Asociacion Long Hu He"
            width={64}
            height={64}
            className="rounded-full"
          />
          <Image
            src="/logo-dorado.png"
            alt="Asociacion Long Hu He"
            width={200}
            height={50}
          />
        </div>
        <motion.div className="relative"> {/* Added relative positioning for glow */}
          <motion.div
            whileHover={{ scale: 1.05 }}
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 text-xl font-semibold glow-border shadow-xl" // Increased height
            >
              Inscribirme
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
