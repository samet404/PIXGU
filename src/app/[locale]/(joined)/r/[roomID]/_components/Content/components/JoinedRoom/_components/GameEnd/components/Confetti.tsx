import { useEffectOnce } from '@/hooks/useEffectOnce'
import confetti from 'canvas-confetti'
import { useRef } from 'react'

export const Confetti = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffectOnce(() => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 460, ticks: 60, zIndex: 80 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    intervalRef.current = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(intervalRef.current!)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
    }
  })

  return null
}
