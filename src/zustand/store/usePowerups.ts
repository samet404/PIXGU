import { GUESSR_CARDS, GUESSR_CARDS_WHILE_THEME_IS_SELECTING, INITIAL_POWERUP_STATE, PAINTER_CARDS, PAINTER_CARDS_WHILE_THEME_IS_SELECTING, WINNERS_CARDS } from '@/constants'
import type { Powerup, TimeBasedPowerups, WordsLengthPowerupData } from '@/types'
import { create } from 'zustand'

type DefaultPowerupProperties = {
    isActive: boolean;
    // Default property, add specific properties conditionally below
};


type ID = string
export type PowerupState = {
    activePowerups: Powerup[]
    runningPowerups: Record<TimeBasedPowerups, ID[]>
    powerups: {
        [P in Powerup]: P extends 'rotate' | 'mirror' | 'zaWarudo' | 'undoBlock'
        ? DefaultPowerupProperties & { running: boolean }
        : P extends 'wordsLength'
        ? DefaultPowerupProperties & { data?: WordsLengthPowerupData }
        : DefaultPowerupProperties
    }
}

type Action = {
    setIsPowerupRunning: (powerup: Powerup, value: boolean) => void
    setPowerupRunning: (powerup: Powerup) => void
    setPowerupIsNotRunning: (powerup: Powerup) => void
    setPainterCardsWhileThemeIsSelecting: () => void
    setGuessrCardsWhileThemeIsSelecting: () => void
    setPainterCards: () => void
    setGuessrCards: () => void
    setWinnersCards: () => void
    setPowerupInActive: (powerup: Powerup) => void
    reset: () => void
}



export const usePowerups = create<PowerupState & Action>((set, get) => ({
    ...INITIAL_POWERUP_STATE,

    setPowerupInActive: (powerup: Powerup) =>
        set({
            activePowerups: get().activePowerups.filter(p => p !== powerup),
            powerups: {
                ...get().powerups,
                [powerup]: {
                    isActive: false
                }
            }
        }),

    setIsPowerupRunning: (powerup: Powerup, value: boolean) =>
        set({
            runningPowerups: {
                ...get().runningPowerups,
                [powerup]: value
            }
        }),

    setPowerupRunning: (powerup: Powerup) => get().setIsPowerupRunning(powerup, true),
    setPowerupIsNotRunning: (powerup: Powerup) => get().setIsPowerupRunning(powerup, false),
    setPainterCardsWhileThemeIsSelecting: () => set({ ...PAINTER_CARDS_WHILE_THEME_IS_SELECTING }),
    setGuessrCardsWhileThemeIsSelecting: () => set({ ...GUESSR_CARDS_WHILE_THEME_IS_SELECTING }),
    setPainterCards: () => set({ ...PAINTER_CARDS }),
    setGuessrCards: () => set({ ...GUESSR_CARDS }),
    setWinnersCards: () => set({ ...WINNERS_CARDS }),
    reset: () => set({ ...INITIAL_POWERUP_STATE })
}))