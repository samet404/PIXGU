import type { Powerup } from '@/types/powerups'

export const calculateCardPositions = (key: Powerup, visibleCards: Powerup[]) => {
    const visibleCount = visibleCards.length
    const visibleIndex = visibleCards.indexOf(key)

    if (visibleIndex === -1) return null

    // If there's only one card, use default position
    if (visibleCount === 1) {
        return {
            rotation: 0,
            translateX: 0,
            translateY: -80
        }
    }

    const radius = 2
    const angleSpread = Math.min(12 * (5 / visibleCount), 20)
    const angle = (visibleIndex - (visibleCount - 1) / 2) * angleSpread
    const radian = (angle * Math.PI) / 180

    // Calculate distance from center (0 = center, 1 = outer edge)
    const centeredness = Math.abs(visibleIndex - (visibleCount - 1) / 2) / ((visibleCount - 1) / 2)

    // Use exponential function for more dramatic height difference
    const baseHeight = -80 // Increased base height
    const heightDrop = Math.pow(centeredness, 2) * 80 // Quadratic drop-off

    return {
        rotation: angle,
        translateX: Math.sin(radian) * radius,
        translateY: -(baseHeight - heightDrop) // Higher number = higher position
    }
}