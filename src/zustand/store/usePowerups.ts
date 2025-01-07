import { GUESSR_CARDS, GUESSR_CARDS_WHILE_THEME_IS_SELECTING, INITIAL_POWERUP_STATE, PAINTER_CARDS, PAINTER_CARDS_WHILE_THEME_IS_SELECTING, WINNERS_CARDS } from '@/constants'
import type { Powerup, PowerupsShowsText, TimeBasedPowerups } from '@/types'
import { create } from 'zustand'
import { useCurrentPanel } from './useCurrentPanel';
import { stringifiedLog } from '@/utils/stringifiedLog';

type DefaultPowerupProperties = {
    isActive: boolean;
    // Default property, add specific properties conditionally below
};


export type PowerupState = {
    activePowerups: Powerup[]
    runningPowerups: Record<TimeBasedPowerups, boolean>
    runningPowerupsArray: TimeBasedPowerups[]
    powerups: {
        [P in Powerup]: P extends 'rotate' | 'mirror' | 'zaWarudo' | 'undoBlock'
        ? DefaultPowerupProperties & { running: boolean }
        : P extends 'wordsLength' | 'letterHint' | 'categoryHint'
        ? DefaultPowerupProperties & { data?: string }
        : DefaultPowerupProperties
    }
}


type PowerupStateMorePersonal = PowerupState & {
    displayingPowerups: Set<Powerup>
    powerupsHasTexts: Powerup[]
}

type Action = {
    setIsPowerupRunning: (powerup: TimeBasedPowerups, value: boolean) => void
    setPowerupRunning: (powerup: TimeBasedPowerups) => void
    setPowerupIsNotRunning: (powerup: TimeBasedPowerups) => void
    setPainterCardsWhileThemeIsSelecting: () => void
    setGuessrCardsWhileThemeIsSelecting: () => void
    setPainterCards: () => void
    setPowerupsHasBackText: (powerupsHasTexts: PowerupsShowsText, data: string) => void,
    setGuessrCards: () => void
    setWinnersCards: () => void
    addDisplayingPowerups: (powerups: Powerup[]) => void
    setDisplayingPowerups: (powerups: Powerup[]) => void
    dontDisplayPowerup: (powerup: Powerup) => void
    setPowerupInActive: (powerup: Powerup) => void
    reset: () => void
}


const initState: PowerupStateMorePersonal = {
    ...INITIAL_POWERUP_STATE,
    displayingPowerups: new Set([]),
    powerupsHasTexts: []
}

export const usePowerups = create<PowerupStateMorePersonal & Action>((set, get) => ({
    ...initState,

    dontDisplayPowerup: (powerup) =>
        set({
            ...get(),
            displayingPowerups: new Set([...Array.from(get().displayingPowerups)].filter(p => p !== powerup))
        }),

    setPowerupInActive: (powerup) =>
        set({
            ...get(),
            activePowerups: get().activePowerups.filter(p => p !== powerup),
            powerups: {
                ...get().powerups,
                [powerup]: {
                    isActive: false
                }
            }
        }),

    setIsPowerupRunning: (powerup, value) => {
        stringifiedLog({ msg: 'setting is powerup running ', powerup, value, data: get() })

        set({
            ...get(),
            runningPowerups: {
                ...get().runningPowerups,
                [powerup]: value
            },
            runningPowerupsArray: (() => {
                if (value) {
                    if (get().runningPowerupsArray.includes(powerup))
                        return get().runningPowerupsArray;
                    else
                        return [...(get().runningPowerupsArray ?? []), powerup];

                }

                return get().runningPowerupsArray?.filter(p => p !== powerup) ?? [];
            })(),

            powerups: {
                ...get().powerups,
                [powerup]: {
                    ...get().powerups[powerup],
                    running: value
                }
            }
        })
        stringifiedLog({ msg: 'after setting is powerup running ', powerup, value, data: get() })
    },

    addDisplayingPowerups: (powerups) =>
        set({
            ...get(),
            displayingPowerups: (() => {
                const newSet = new Set(get().displayingPowerups)
                powerups.forEach(powerup => {
                    newSet.add(powerup)
                })

                return newSet
            })()
        }),

    setDisplayingPowerups: (powerups) =>
        set({
            ...get(),
            displayingPowerups: new Set([...powerups])
        }),

    setPowerupRunning: (powerup) => get().setIsPowerupRunning(powerup, true),
    setPowerupIsNotRunning: (powerup) => get().setIsPowerupRunning(powerup, false),
    setPainterCardsWhileThemeIsSelecting: () => {
        get().setDisplayingPowerups(PAINTER_CARDS_WHILE_THEME_IS_SELECTING.activePowerups)
        set({
            ...get(),
            displayingPowerups: useCurrentPanel.getState().currentPanel === 'power-ups' ? new Set(PAINTER_CARDS_WHILE_THEME_IS_SELECTING.activePowerups) : new Set(get().displayingPowerups),
            ...PAINTER_CARDS_WHILE_THEME_IS_SELECTING
        })
    },

    setGuessrCardsWhileThemeIsSelecting: () => {
        get().setDisplayingPowerups(GUESSR_CARDS_WHILE_THEME_IS_SELECTING.activePowerups)
        set({
            ...get(),
            displayingPowerups: useCurrentPanel.getState().currentPanel === 'power-ups' ? new Set(GUESSR_CARDS_WHILE_THEME_IS_SELECTING.activePowerups) : new Set(get().displayingPowerups),
            ...GUESSR_CARDS_WHILE_THEME_IS_SELECTING
        })
    },

    setPainterCards: () => {

        set({
            ...get(),
            displayingPowerups: useCurrentPanel.getState().currentPanel === 'power-ups' ? new Set(PAINTER_CARDS.activePowerups) : new Set(get().displayingPowerups),
            ...PAINTER_CARDS
        })
    },
    setGuessrCards: () => {
        get().setDisplayingPowerups(GUESSR_CARDS.activePowerups)
        set({
            ...get(),
            displayingPowerups: useCurrentPanel.getState().currentPanel === 'power-ups' ? new Set(GUESSR_CARDS.activePowerups) : new Set(get().displayingPowerups),
            ...GUESSR_CARDS
        })
    },
    setWinnersCards: () => {
        get().setDisplayingPowerups(WINNERS_CARDS.activePowerups)
        set({
            ...get(),
            displayingPowerups: useCurrentPanel.getState().currentPanel === 'power-ups' ? new Set(WINNERS_CARDS.activePowerups) : new Set(get().displayingPowerups),
            ...WINNERS_CARDS
        })
    },

    setPowerupsHasBackText: (powerupHasText, data) => {
        set({
            powerupsHasTexts: [...get().powerupsHasTexts, powerupHasText],
            powerups: {
                ...get().powerups,
                [powerupHasText]: {
                    ...get().powerups[powerupHasText],
                    data
                }
            }
        })
    },

    reset: () => set({ ...INITIAL_POWERUP_STATE })
}))