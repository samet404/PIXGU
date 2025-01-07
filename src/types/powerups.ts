export type Powerup =
    | 'letterHint'
    | 'changeThemes'
    | 'rotate'
    | 'mirror'
    | 'giveUp'
    | 'undoBlock'
    | 'colorChaos'
    | 'pencilSize'
    | 'invisiblePencil'
    | 'zaWarudo'
    | 'rainingColors'
    | 'wordsLength'
    | 'categoryHint'

export type TimeBasedPowerups = Extract<Powerup, 'undoBlock' | 'zaWarudo' | 'rotate' | 'mirror' | 'invisiblePencil'>
export type ChangeThemesPowerupData = [string, string]
export type AIPowerupData = string
export type RainingColorsPowerupData = [
    color: Uint8ClampedArray,
    [
        x: number,
        y: number
    ]
][]


export type PowerupsShowsText = 'letterHint' | 'wordsLength' | 'categoryHint'