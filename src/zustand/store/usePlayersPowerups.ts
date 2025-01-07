import {
    GUESSR_CARDS,
    GUESSR_CARDS_WHILE_THEME_IS_SELECTING,
    PAINTER_CARDS,
    PAINTER_CARDS_WHILE_THEME_IS_SELECTING,
    WINNERS_CARDS
} from '@/constants'
import { create } from 'zustand'
import type { PowerupState } from './usePowerups'
import type { PartialRecord } from '@/types/partialRecord'
import type { OverrideProps, Powerup, TimeBasedPowerups } from '@/types'
import { stringifiedLog } from '@/utils/stringifiedLog'

type ID = string

type State = {
    users: PartialRecord<ID, Partial<OverrideProps<PowerupState, {
        powerups: Partial<PowerupState['powerups']>
    }>>>
    runningPowerupsArray: TimeBasedPowerups[]
    runningPowerups: Record<TimeBasedPowerups, {
        IDs: string[]
        process: {
            ID: string
            startAt: number
        }[]
    }>
}

type Action = {
    setPowerupInActive: (ID: ID, powerup: Powerup) => void
    setPainterCardsWhileThemeIsSelecting: (ID: ID) => void
    setGuessrCardsWhileThemeIsSelecting: (ID: ID) => void
    setPainterPowerups: (ID: ID) => void
    setIsPowerupRunning: (ID: ID, powerup: TimeBasedPowerups, value: boolean) => void
    setPowerupRunning: (ID: ID, powerup: TimeBasedPowerups) => void
    setPowerupIsNotRunning: (ID: ID, powerup: TimeBasedPowerups) => void
    setGuessrPowerups: (ID: ID) => void
    setWinnersPowerups: (ID: ID) => void
    removeUser: (ID: ID) => void
    reset: () => void
}

const INIT_GENERAL_RUNNING_POWERUPS: {
    runningPowerups: State['runningPowerups']
    runningPowerupsArray: State['runningPowerupsArray']
} = {
    runningPowerupsArray: [],
    runningPowerups: {
        invisiblePencil: { IDs: [], process: [] },
        rotate: { IDs: [], process: [] },
        mirror: { IDs: [], process: [] },
        undoBlock: { IDs: [], process: [] },
        zaWarudo: { IDs: [], process: [] },
    }
}

const initState: State = {
    ...INIT_GENERAL_RUNNING_POWERUPS,
    users: {}
}

export const usePlayersPowerups = create<State & Action>((set, get) => ({
    ...initState,

    removeUser: (ID: ID) => set({
        users: Object.fromEntries(
            Object.entries(get().users).filter(([key]) => key !== ID)
        ),
    }),

    setIsPowerupRunning: (ID, powerup, value) => {
        // stringifiedLog({ msg: 'setting is powerup running ', ID, powerup, value, data: get() })

        const currentPowerups = get().runningPowerups[powerup]

        set({
            runningPowerupsArray: value
                ? [...(get().runningPowerupsArray ?? []), powerup]
                : get().runningPowerupsArray.filter(p => p !== powerup)
            ,
            runningPowerups: {
                ...get().runningPowerups,
                [powerup]: {
                    ...currentPowerups,
                    IDs: value
                        ? [...(currentPowerups.IDs ?? []), ID]
                        : currentPowerups.IDs.filter(p => p !== ID),
                    process: value
                        ? [...(currentPowerups.process ?? []), { ID, startAt: Date.now() }]
                        : currentPowerups.process.filter(p => p.ID !== ID)
                }
            },
            users: {
                ...get().users,
                [ID]: {
                    ...get().users[ID],
                    runningPowerups: {
                        ...get().users[ID]!.runningPowerups!,
                        [powerup]: value
                    },
                    runningPowerupsArray: value
                        ? [...(get().users[ID]?.runningPowerupsArray ?? []), powerup]
                        : get().users[ID]?.runningPowerupsArray?.filter(p => p !== powerup),
                    powerups: {
                        ...(get().users[ID]?.powerups ?? {}),
                        [powerup]: {
                            ...(get().users[ID]?.powerups?.[powerup] ?? {}),
                            running: value
                        }
                    }
                }
            }
        })

        // stringifiedLog({ msg: 'after setting is powerup running ', ID, powerup, value, data: get() })
    },

    setPowerupRunning: (ID, powerup) =>
        get().setIsPowerupRunning(ID, powerup, true),

    setPowerupIsNotRunning: (ID, powerup) =>
        get().setIsPowerupRunning(ID, powerup, false),

    setPowerupInActive: (ID: ID, powerup: Powerup) => {
        console.log(get().users, ID, powerup)
        set({
            ...get(),
            users: {
                ...get().users,
                [ID]: {
                    ...(get().users?.[ID] ?? {}),
                    activePowerups: get().users[ID]!.activePowerups!.filter(p => p !== powerup),
                    powerups: {
                        ...get().users[ID]?.powerups,
                        [powerup]: {
                            ...get().users[ID]?.powerups?.[powerup],
                            isActive: false
                        }
                    }
                }
            }
        })
    },

    setPainterCardsWhileThemeIsSelecting: (ID: ID) => set({
        users: {
            ...get().users,
            [ID]: PAINTER_CARDS_WHILE_THEME_IS_SELECTING
        }
    }),

    setGuessrCardsWhileThemeIsSelecting: (ID: ID) => set({
        users: {
            ...get().users,
            [ID]: GUESSR_CARDS_WHILE_THEME_IS_SELECTING
        }
    }),

    setGuessrPowerups: (ID: ID) => set({
        users: { ...get().users, [ID]: GUESSR_CARDS }
    }),

    setPainterPowerups: (ID: ID) => set({
        users: { ...get().users, [ID]: PAINTER_CARDS }
    }),

    setWinnersPowerups: (ID: ID) => set({
        users: { ...get().users, [ID]: WINNERS_CARDS }
    }),

    reset: () => set({ ...initState })
}))