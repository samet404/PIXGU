'use client'

import type { OverrideProps } from '@/types/overrideProps'
import { clsxMerge } from '@/utils/clsxMerge'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useState, type ComponentProps } from 'react'

export const GameCard = ({ title, description, className, rotation, onRemove, addTranslateX, addTranslateY, ...rest }: Props) => {
    const [isVisible, setIsVisible] = useState(true)

    const [springs, api] = useSpring(() => ({
        from: {
            scale: 1,
            translateY: addTranslateY,
            translateX: addTranslateX,
            rotate: rotation,
            opacity: 1
        },
        config: { tension: 100, friction: 10 },
    }))


    useEffect(() => {
        api.start({
            translateY: addTranslateY,
            translateX: addTranslateX,
            rotate: rotation,
            immediate: false,
            config: { tension: 120, friction: 14 }
        })
    }, [addTranslateY, addTranslateX, rotation, api])


    const handleClick = () => {
        api.start({
            to: [
                {
                    scale: 0.95,
                    immediate: true,
                    rotate: rotation, // Keep rotation
                    translateX: addTranslateX // Keep X position
                },
                {
                    opacity: 0,
                    translateY: addTranslateY - 200,
                    translateX: addTranslateX, // Keep X position
                    rotate: rotation, // Keep rotation
                    scale: 0.95,
                    config: { tension: 120, friction: 14 }
                }
            ]
        })
        setTimeout(() => {
            setIsVisible(false)
            onRemove?.()
        }, 500)
    }

    if (!isVisible) return null

    return (
        <animated.button
            style={springs}
            onClick={handleClick}
            onMouseEnter={() => api.start({
                scale: 1.03,
                translateY: addTranslateY - 20,
                rotate: rotation, // Keep rotation
                translateX: addTranslateX // Keep X position
            })}
            onMouseLeave={() => api.start({
                scale: 1,
                translateY: addTranslateY,
                rotate: rotation, // Keep rotation
                translateX: addTranslateX // Keep X position
            })}
            className={clsxMerge(`group select-none relative w-[10rem] h-[17rem] transition-[z-index] duration-300 hover:z-10 ${className}`)}
            {...rest}
        >
            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70 shadow-lg" />

            {/* Animated border wrapper */}
            <div className="absolute inset-0 rounded-xl p-[2px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-yellow-300 before:via-amber-300 before:to-yellow-300 before:animate-border-spin before:content-['']" />

            {/* Card body */}
            <div className="relative h-full w-full rounded-xl bg-white p-4 shadow-xl">
                <div className="flex h-full flex-col">
                    <div className='flex flex-col'>
                        <h2 className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-[length:200%_auto] bg-clip-text text-xl font-bold text-transparent animate-title-shine">
                            {title}
                        </h2>
                        <p className="pt-3 text-xs font-medium text-amber-900">
                            {description}
                        </p>
                    </div>
                    <div className='grow items-end justify-center flex flex-row gap-8'>
                        <div className='size-4 rounded-full bg-yellow-300'>
                            {Math.floor(Math.random() * 100)}
                        </div>
                        <div className='size-4 rounded-full bg-purple-500'></div>
                    </div>
                </div>
            </div>
        </animated.button>
    )
}

type Props = OverrideProps<ComponentProps<typeof animated.button>, {
    title: string
    description: string
    rotation: number
    addTranslateY: number
    addTranslateX: number
    className?: string
    onRemove?: () => void
}>