"use client"

import { useEffect, useRef } from "react"

export function SoundManager() {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API for subtle sound effects
    if (typeof window !== "undefined" && "AudioContext" in window) {
      audioContextRef.current = new AudioContext()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playTone = (frequency: number, duration: number, volume = 0.1) => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  // Expose sound functions globally
  useEffect(() => {
    ;(window as any).playSuccessSound = () =>
      playTone(
        523.25, // C5
        0.2,
        0.05,
      )
    ;(window as any).playHoverSound = () =>
      playTone(
        440, // A4
        0.1,
        0.03,
      )
    ;(window as any).playClickSound = () => playTone(659.25, 0.15, 0.04) // E5
  }, [])

  return null
}
