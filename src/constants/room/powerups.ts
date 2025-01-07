import type { Powerup, TimeBasedPowerups } from '@/types'
import type { PowerupState } from '@/zustand/store'

export type ID = string
export const INIT_RUNNING_POWERUPS = {
    invisiblePencil: false,
    rotate: false,
    mirror: false,
    undoBlock: false,
    zaWarudo: false,
}


export const PAINTER_CARDS: PowerupState = {
    runningPowerupsArray: [],
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['giveUp'],
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
            isActive: false,
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
    runningPowerupsArray: [],
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
            isActive: false,
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
    runningPowerupsArray: [],
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['changeThemes'],
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
            isActive: false,
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
    runningPowerupsArray: [],
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
            isActive: false,
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
    runningPowerupsArray: [],
    runningPowerups: INIT_RUNNING_POWERUPS,
    activePowerups: ['rotate', 'mirror', 'undoBlock', 'colorChaos', 'pencilSize', 'invisiblePencil', 'rainingColors', 'zaWarudo'],
    powerups: {
        rotate: {
            isActive: true,
            running: false
        },
        mirror: {
            isActive: true,
            running: false
        },
        undoBlock: {
            isActive: true,
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
    runningPowerupsArray: [],
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
            isActive: false,
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
    letterHint: 10,
    changeThemes: 20,
    rotate: 20,
    mirror: 20,
    giveUp: 50,
    undoBlock: 30,
    colorChaos: 10,
    pencilSize: 30,
    invisiblePencil: 30,
    zaWarudo: 30,
    rainingColors: 20,
    wordsLength: 10,
    categoryHint: 10
}

export const POWERUP_DURATIONS: Record<TimeBasedPowerups, number> = {
    undoBlock: 1000 * 10,
    zaWarudo: 1000 * 10,
    rotate: 1000 * 10,
    mirror: 1000 * 20,
    invisiblePencil: 1000 * 10,
}

export const POWERUPS_SHOWS_TEXT: Powerup[] = ['letterHint', 'wordsLength', 'categoryHint']