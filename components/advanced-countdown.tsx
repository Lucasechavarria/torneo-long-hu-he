"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimeUnit {
  value: number
  label: string
}

export function AdvancedCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const targetDate = new Date("2025-11-23T10:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft([
          { value: days, label: "Días" },
          { value: hours, label: "Horas" },
          { value: minutes, label: "Min" },
          { value: seconds, label: "Seg" },
        ])
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex justify-center gap-4 my-8">
      {timeLeft.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ rotateY: 0,
            // Animación de pulso constante
            scale: [1, 1.05, 1],
            transition: {
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut"
              }
            }
          }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-lg p-1 sm:p-4 min-w-[60px] sm:min-w-[80px] md:min-w-[100px] shadow-2xl border border-orange-500/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={unit.value}
                initial={{ rotateX: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                exit={{ rotateX: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value} // Key is crucial for AnimatePresence to detect changes
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-1"
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] sm:text-sm text-orange-200 uppercase tracking-wider">{unit.label}</div> {/* Adjusted font size for label */}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-orange-500/20 rounded-lg blur-xl -z-10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              delay: index * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
