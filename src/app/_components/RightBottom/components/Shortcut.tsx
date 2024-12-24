"use client"

import { MODIFIER_KEYS } from '@/constants'
import { useControls } from '@/zustand/store'
import { useEffect, useRef, } from 'react'

//  We are using a big delay for the first key press to avoid accidental key presses
const FIRST_KEY_DELAY = 600

export const Shortcut = () => {
    const addToCombination = useControls(s => s.addToCombination)
    const clearCombination = useControls(s => s.clearCombination)
    const clearOneCombinationKey = useControls(s => s.clearOneCombinationKey)
    const combination = useControls(s => s.combination)
    const keydownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
    const keydownIntervalDelay = useRef<number>(FIRST_KEY_DELAY)
    const currentModifiers = useRef<string[]>([])

    useEffect(() => {
        // clears everything
        const clear = () => {
            if (keydownInterval.current) {
                clearInterval(keydownInterval.current)
            }

            clearCombination()
            keydownInterval.current = null
            keydownIntervalDelay.current = FIRST_KEY_DELAY
            currentModifiers.current = []
        }

        // sets interval for key for hold down effect
        const setKeyDownInterval = () => {
            clearInterval(keydownInterval.current!)

            keydownInterval.current = setInterval(() => {
                const combination = useControls.getState().combination
                console.log('combination', combination)
                // if combination is just modifiers
                if (combination.every(key => MODIFIER_KEYS.has(key))) {
                    clearInterval(keydownInterval.current!)
                    return
                }

                useControls.getState().setSameCombination()

                if (keydownIntervalDelay.current !== 50) {
                    keydownIntervalDelay.current = Math.max(50, keydownIntervalDelay.current * 0.1)
                    setKeyDownInterval()
                }
            }, keydownIntervalDelay.current)
        }


        const handleKeydown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
            e.preventDefault()

            const combination = useControls.getState().combination
            const key = e.key.toUpperCase()

            if (combination.includes(key)) return

            const currentModifiersVal = currentModifiers.current


            // Handle modifier keys
            if (MODIFIER_KEYS.has(key)) {
                if (currentModifiersVal.length > 0) {
                    // Validate modifier state
                    const hasCorrectModifiers = currentModifiersVal.every(modifier => {
                        switch (modifier) {
                            case 'CONTROL':
                                return e.ctrlKey
                            case 'ALT':
                                return e.altKey
                            case 'SHIFT':
                                return e.shiftKey
                            case 'META':
                                return e.metaKey
                        }
                    })
                    if (!hasCorrectModifiers) {
                        clear()
                        return
                    }
                }


                currentModifiersVal.push(key)
                if (!useControls.getState().combination.includes(key)) addToCombination(key)
                // setKeyDownInterval()
                return
            }


            // Handle normal keys without modifiers

            if (!combination.includes(key)) addToCombination(key)
            keydownIntervalDelay.current = FIRST_KEY_DELAY
            setKeyDownInterval()
        }


        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            const key = e.key.toUpperCase()
            const isModifier = MODIFIER_KEYS.has(key)
            if (isModifier) {
                currentModifiers.current = currentModifiers.current.filter(modifier => modifier !== key)
                if (useControls.getState().combination.length === 1) clear()
            }
            else {
                if (useControls.getState().combination.length === 1) clear()
            }

            clearOneCombinationKey(key)
        }

        const handleBlur = () => clear()


        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('keyup', handleKeyUp)
        window.addEventListener('blur', handleBlur)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('blur', handleBlur)
        }
    }, [])

    return <div className='px-2 py-1 rounded-md text-xs font-[900] text-white'>
        {combination.join(' + ')}
    </div>

}    
