import type { Powerup, TimeBasedPowerups } from '@/types'
import type { PowerupState } from '@/zustand/store'

export type ID = string
export const INIT_RUNNING_POWERUPS: Record<TimeBasedPowerups, ID[]> = {
    invisiblePencil: [],
    rotate: [],
    mirror: [],
    undoBlock: [],
    zaWarudo: [],
}


export const PAINTER_CARDS: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['changeThemes', 'giveUp', 'zaWarudo'],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: false },
        changeThemes: { isActive: true },
        giveUp: { isActive: true },
        colorChaos: { isActive: false },
        pencilSize: { isActive: false },
        invisiblePencil: { isActive: false },
        rainingColors: { isActive: false },
        wordsLength: { isActive: false },
        categoryHint: { isActive: false }
    }
}

export const GUESSR_CARDS_WHILE_THEME_IS_SELECTING: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['rotate'],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: false },
        changeThemes: { isActive: false },
        giveUp: { isActive: false },
        colorChaos: { isActive: false },
        pencilSize: { isActive: false },
        invisiblePencil: { isActive: false },
        rainingColors: { isActive: false },
        wordsLength: { isActive: false },
        categoryHint: { isActive: false }
    }
}

export const PAINTER_CARDS_WHILE_THEME_IS_SELECTING: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['changeThemes', 'zaWarudo'],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: false },
        changeThemes: { isActive: true },
        giveUp: { isActive: false },
        colorChaos: { isActive: false },
        pencilSize: { isActive: false },
        invisiblePencil: { isActive: false },
        rainingColors: { isActive: false },
        wordsLength: { isActive: false },
        categoryHint: { isActive: false }
    }
}

export const GUESSR_CARDS: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['letterHint', 'giveUp', 'categoryHint', 'wordsLength'],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: true },
        changeThemes: { isActive: false },
        giveUp: { isActive: true },
        invisiblePencil: { isActive: true },
        colorChaos: { isActive: false },
        pencilSize: { isActive: false },
        rainingColors: { isActive: false },
        categoryHint: { isActive: true },
        wordsLength: { isActive: true }
    }
}

export const WINNERS_CARDS: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['rotate', 'mirror', 'undoBlock', 'colorChaos', 'pencilSize', 'invisiblePencil', 'rainingColors'],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: false },
        changeThemes: { isActive: false },
        giveUp: { isActive: false },
        colorChaos: { isActive: true },
        pencilSize: { isActive: true },
        invisiblePencil: { isActive: true },
        categoryHint: { isActive: false },
        rainingColors: { isActive: true },
        wordsLength: {
            isActive: false
        }
    }
}

export const INITIAL_POWERUP_STATE: PowerupState = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: [],
    powerups: {
        rotate: {
            isActive: false,
            running: false
        },
        mirror: {
            isActive: false,
            running: false
        },
        undoBlock: {
            isActive: false,
            running: false
        },
        zaWarudo: {
            isActive: true,
            running: false
        },
        letterHint: { isActive: false },
        changeThemes: { isActive: false },
        giveUp: { isActive: false },
        colorChaos: { isActive: false },
        pencilSize: { isActive: false },
        invisiblePencil: { isActive: false },
        rainingColors: { isActive: false },
        wordsLength: { isActive: false },
        categoryHint: { isActive: false }
    }
}

export const POWERUP_PRICES: Record<Powerup, number> = {
    letterHint: 100,
    changeThemes: 100,
    rotate: 100,
    mirror: 100,
    giveUp: 100,
    undoBlock: 100,
    colorChaos: 100,
    pencilSize: 100,
    invisiblePencil: 100,
    zaWarudo: 100,
    rainingColors: 100,
    wordsLength: 100,
    categoryHint: 100
}

export const POWERUP_DURATIONS: Record<TimeBasedPowerups, number> = {
    undoBlock: 1000 * 10,
    zaWarudo: 1000 * 10,
    rotate: 1000 * 10,
    mirror: 1000 * 10,
    invisiblePencil: 1000 * 10,
}