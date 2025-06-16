'use client'

import type { OverrideProps, Powerup } from '@/types'
import { POWERUP_PRICES, POWERUPS_SHOWS_TEXT } from '@/constants'
import { clsxMerge } from '@/utils'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { animated } from '@react-spring/web'
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import { useAnimation } from './hooks/useAnimation'


export const Card = ({ title, description, className, keyName, onDisplayRemove, backContent, active, rotation, onClicked, addTranslateX, addTranslateY, ...rest }: Props) => {
    const { api, springs } = useAnimation(addTranslateX, addTranslateY, rotation)
    const [cardPrice,] = useState<number>(POWERUP_PRICES[keyName])
    const myCoin = useMyCoin(s => s.coin)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const coinIsNotEnough = myCoin < cardPrice
    const [isFlipped, setIsFlipped] = useState(false)

    if (keyName === 'letterHint') console.log({
        active,
        coinIsNotEnough,
        keyName,
        myCoin,
        cardPrice,
        backContent,
    })

    useEffect(() => {
        if (
            active ||
            POWERUPS_SHOWS_TEXT.includes(keyName)
        ) return

        api.start({
            to: [
                {
                    scale: 0.95,
                    immediate: true,
                    rotate: rotation,
                    translateX: addTranslateX,
                },
                {
                    opacity: 0,
                    translateY: addTranslateY - 200,
                    translateX: addTranslateX,
                    rotate: rotation,
                    scale: 0.95,
                }
            ]
        })

        timerRef.current = setTimeout(() => {
            onDisplayRemove()
            timerRef.current = null
        }, 500)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [active])

    const handleClick = () => {
        api.start({
            from: {
                scale: 0.95,
            },
            to: {
                scale: 1,
            },
            config: { mass: 5, tension: 500, friction: 80 }
        })
        console.log({
            active,
            coinIsNotEnough,
            keyName,
            myCoin,
            cardPrice,
            backContent,
        })
        // if (coinIsNotEnough) return
        if (backContent) {
            api.start({
                to: {
                    rotateY: isFlipped ? 0 : 180,
                },
                config: { mass: 5, tension: 500, friction: 80 }
            })
            setIsFlipped(!isFlipped)
            return
        }

        if (coinIsNotEnough || !active) return

        onClicked()

    }

    return (
        <animated.button
            style={{
                ...springs,
                position: 'absolute',
                transformStyle: 'preserve-3d',
            }}
            onMouseDown={handleClick}
            onMouseEnter={() => !isFlipped && api.start({
                scale: 1.03,
                translateY: addTranslateY - 20,
                rotate: rotation,
                translateX: addTranslateX,
            })}
            onMouseLeave={() => !isFlipped && api.start({
                scale: 1,
                translateY: addTranslateY,
                rotate: rotation,
                translateX: addTranslateX,
            })}
            className={clsxMerge(`group select-none w-[10rem] z-0 hover:z-10 h-[17rem] ${className}`, {
                'cursor-not-allowed': coinIsNotEnough
            })}
            {...rest}
        >
            {/* Front of card */}
            <div style={{
                backfaceVisibility: 'hidden',
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}>
                {/* Outer glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70 shadow-lg" />

                {/* Animated border wrapper */}
                <div className="absolute inset-0 rounded-xl p-[2px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-yellow-300 before:via-amber-300 before:to-yellow-300 before:animate-border-spin before:content-['']" />

                {/* Card body */}
                <div className="relative h-full w-full rounded-xl bg-white p-4 shadow-xl">
                    <div className="flex h-full flex-col items-center gap-4">
                        <div className='flex flex-col'>
                            <h2 className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-[length:200%_auto] bg-clip-text text-xl font-bold text-transparent animate-title-shine">
                                {title}
                            </h2>
                            <p className="pt-3 text-xs font-medium text-amber-900">
                                {description}
                            </p>
                        </div>
                        {(coinIsNotEnough && !backContent) && <div className='text-xs text-red-500 hidden group-hover:flex animate-fade-blur'>You need {cardPrice - myCoin} coins to use</div>}
                        {backContent && <div className='text-xs text-[#00000086]'>You can flip the card</div>}
                        <div className='grow items-end justify-center flex flex-row gap-8'>
                            <div className='size-4 text-yellow-900 rounded-full bg-yellow-300 font-[600]'>
                                {cardPrice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back of card */}
            {backContent && (
                <div style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}>
                    <div className="relative h-full w-full rounded-xl bg-white p-4 shadow-xl">
                        <h2 className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-[length:200%_auto] bg-clip-text font-bold text-transparent animate-title-shine">
                            {backContent}
                        </h2>
                    </div>
                </div>
            )}
        </animated.button>
    )
}

type Props = OverrideProps<ComponentProps<typeof animated.button>, {
    keyName: Powerup
    title: Powerup
    description: string
    rotation: number
    backContent: ReactNode
    addTranslateY: number
    addTranslateX: number
    active: boolean
    className?: string
    onClicked: () => void
    onDisplayRemove: () => void
}>