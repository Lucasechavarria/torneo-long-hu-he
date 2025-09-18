"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function MartialArtsLogo3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="relative w-80 h-80 mx-auto perspective-1000">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Dragon Layer */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-orange-500/30"
          style={{ transform: "translateZ(40px)" }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-600/30 to-red-700/30 flex items-center justify-center">
            <motion.div
              className="text-6xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              🐉
            </motion.div>
          </div>
        </motion.div>

        {/* Tiger Layer */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm border border-amber-500/30"
          style={{ transform: "translateZ(20px)" }}
          animate={{
            rotate: -360,
            scale: [1, 1.03, 1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-600/30 to-orange-700/30 flex items-center justify-center">
            <motion.div
              className="text-5xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              🐅
            </motion.div>
          </div>
        </motion.div>

        {/* Crane Layer */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-500/20 to-gray-600/20 backdrop-blur-sm border border-slate-500/30"
          style={{ transform: "translateZ(0px)" }}
          animate={{
            rotate: 360,
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-600/30 to-gray-700/30 flex items-center justify-center">
            <motion.div
              className="text-4xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              🕊️
            </motion.div>
          </div>
        </motion.div>

        {/* Center Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="text-center">
            <motion.h3
              className="text-2xl font-bold text-white mb-2"
              animate={{
                textShadow: [
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.8)",
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              KUNG FU
            </motion.h3>
            <motion.p
              className="text-sm text-orange-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              SHAOLIN
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
