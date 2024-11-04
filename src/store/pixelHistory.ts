
const initValue: Value = {
    history: {}
}

/**
 * History of all pixels drawn
 */
export const storePixelHistory: Store = {
    value: initValue,

    get: function ([x, y]) { return this.value.history[`${x}_${y}`] },
    getAll: function () { return this.value.history },
    add: function ({ x, y, rgba, tool }) {
        this.value.history = {
            ...this.value.history,
            [`${x}_${y}`]: { rgba, tool },
        }
    },
    reset: function () { this.value = initValue },
}


// #region Types
import type { PainterToolState } from '@/zustand/store'

type X = number
type Y = number
type ToolName = PainterToolState['current']

export type HistoryValue = {
    tool: ToolName
    rgba: Uint8ClampedArray
}
export type History = Record<
    `${X}_${Y}`, HistoryValue
>

type Value = {
    history: History
}

type Action = {
    get: (input: [number, number]) => HistoryValue | undefined
    getAll: () => History
    add: (
        input: HistoryValue & {
            x: number
            y: number
        },
    ) => void
    reset: () => void
}

type Store = { value: Value } & Action

export type PixelHistoryStoreValue = Value
export type PixelHistoryStoreAction = Action
export type PixelHistoryStore = Store
export type PixelHistoryStoreHistoryValue = HistoryValue
// #endregion
