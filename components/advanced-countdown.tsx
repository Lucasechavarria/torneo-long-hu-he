"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimeUnit {
  value: number
  label: string
  kanji: string
}

export function AdvancedCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Domingo 22 de Noviembre de 2026, 10:00 hs Argentina (UTC-3)
    const targetDate = new Date("2026-11-22T10:00:00-03:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft([
          { value: days, label: "Días", kanji: "天" },
          { value: hours, label: "Horas", kanji: "时" },
          { value: minutes, label: "Minutos", kanji: "分" },
          { value: seconds, label: "Segundos", kanji: "秒" },
        ])
      } else {
        setTimeLeft([
          { value: 0, label: "Días", kanji: "天" },
          { value: 0, label: "Horas", kanji: "时" },
          { value: 0, label: "Minutos", kanji: "分" },
          { value: 0, label: "Segundos", kanji: "秒" },
        ])
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted || timeLeft.length === 0) return null

  return (
    <div className="relative py-4 my-6">
      {/* Background brushed accent */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {timeLeft.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group"
          >
            {/* Card Frame */}
            <div className="relative bg-gradient-to-b from-red-950/80 via-black/90 to-black/95 rounded-lg p-2 sm:p-4 min-w-[70px] sm:min-w-[95px] md:min-w-[115px] shadow-2xl border border-amber-500/40 backdrop-blur-sm overflow-hidden">
              {/* Corner Traditional Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-400" />

              {/* Watermark Kanji */}
              <span className="absolute top-1 right-2 text-red-500/15 font-yuji-boku text-2xl select-none pointer-events-none">
                {unit.kanji}
              </span>

              <div className="text-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-black gold-gradient-text tracking-tight font-sans drop-shadow-md"
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-200/90 mt-1">
                  {unit.label}
                </div>
              </div>
            </div>

            {/* Subtle Golden/Crimson Aura */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-amber-500/20 rounded-lg blur-lg -z-10"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.2,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

