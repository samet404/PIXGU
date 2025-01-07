// calculatePositions.ts
import type { Powerup } from '@/types/powerups'

export const calculateCardPositions = (key: Powerup, visibleCards: Powerup[]) => {
    const visibleCount = visibleCards.length
    const visibleIndex = visibleCards.indexOf(key)

    // Single card centered position
    if (visibleCount === 1) {
        return {
            rotation: 0,
            translateX: 0,
            translateY: 0, // Reset base offset
        }
    }

    // Get viewport dimensions
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
    const cardWidth = 160 // 10rem in pixels

    // Calculate maximum width the cards should span
    const maxArcWidth = Math.min(viewportWidth * 0.5, cardWidth * (visibleCount * 0.8))

    // Calculate spacing between cards
    const cardSpacing = visibleCount === 2 ? maxArcWidth / 2 : maxArcWidth / (visibleCount - 1)

    // Center the cards by offsetting from the middle
    const centerOffset = -(maxArcWidth / 2)

    // Calculate X position
    const translateX = centerOffset + (visibleIndex * cardSpacing)

    // Calculate arc height and Y position
    const maxHeight = visibleCount * 10 // Maximum height of the arc
    const normalizedPosition = visibleIndex / (visibleCount - 1) // 0 to 1
    const arcHeight = Math.sin(normalizedPosition * Math.PI) * maxHeight

    // Calculate rotation (less rotation for better readability)
    const maxRotation = visibleCount === 2 ? 5 : 15 // Maximum rotation in degrees
    const rotation = maxRotation * (normalizedPosition * 2 - 1)

    return {
        rotation,
        translateX,
        translateY: -arcHeight,
    }
}