"use client"

import { GameCard } from './Card'
import { Outfit } from 'next/font/google'
import { useState, } from 'react'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700'],
})

const calculateCardPosition = (key: CardsKeys, visibleCards: CardsKeys[]) => {
    const visibleCount = visibleCards.length
    const visibleIndex = visibleCards.indexOf(key)

    if (visibleIndex === -1) return null

    // If there's only one card, use default position
    if (visibleCount === 1) {
        return {
            rotation: 0,
            translateX: 0,
            translateY: -60
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

const cards = {
    letterHint: {
        title: "Letter hint",
        description: "Get a hint showing the random letter of the word you need to guess"
    },
    changeThemes: {
        title: "Change themes",
        description: "Switch between different drawing themes"
    },
    rotate: {
        title: "Rotate",
        description: "Rotate everyone's canvas to create chaos and confusion"
    },
    mirror: {
        title: "I like mirrors",
        description: "Flip the canvas to create a mirrored effect"
    },
} as const


type CardsKeys = keyof typeof cards


const Container = () => {
    const [visibleCards, setVisibleCards] = useState<CardsKeys[]>(Object.keys(cards) as CardsKeys[])

    const handleCardRemove = (inputKey: CardsKeys) => {
        setVisibleCards(prev => prev.filter(key => key !== inputKey))
    }

    return (
        <div className={`${outfit.className} flex flex-row items-center justify-center w-full h-full`}>
            <div className="relative">
                {visibleCards.map((keyName) => {
                    const { description, title } = cards[keyName as CardsKeys]
                    const position = calculateCardPosition(keyName, visibleCards)
                    if (!position) return null

                    return (
                        <GameCard
                            key={keyName}
                            title={title}
                            description={description}
                            rotation={position.rotation}
                            addTranslateX={position.translateX}
                            addTranslateY={position.translateY}
                            onRemove={() => handleCardRemove(keyName)} // Pass cardIndex instead of index
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Container