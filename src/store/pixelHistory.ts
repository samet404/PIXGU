import { alphaBlendRGBA } from '@/utils/alphaBlend'

const initValue: Value = {
    history: {
        rgb: {},
        tool: {}
    }
}

const DEFAULT_COLOR = new Uint8ClampedArray([255, 255, 255, 255])

/**
 * History of all pixels drawn
 */
export const storePixelHistory: Store = {
    value: initValue,

    get: function () { return this.value.history },
    getRgb: function ([x, y]) { return this.value.history.rgb[`${x!}_${y!}`] ?? DEFAULT_COLOR },
    getTool: function ([x, y]) { return this.value.history.tool[`${x!}_${y!}`] },
    add: function (x, y, rgba, tool) {
        const prevRgbQuery = this.getRgb(new Uint16Array([x, y]))
        const prevRgba = prevRgbQuery ? new Uint8ClampedArray([...prevRgbQuery, 255]) : DEFAULT_COLOR
        const newRgb = alphaBlendRGBA(prevRgba, rgba)

        this.value.history.rgb[`${x}_${y}`] = newRgb
        if (tool) this.value.history.tool[`${x}_${y}`] = tool
    },
    addRgbsData: function (input) {
        this.value.history.rgb = { ...this.value.history.rgb, ...input }
    },
    wouldColorChange: function (x, y, rgba) {
        const prevRgb = this.getRgb(new Uint16Array([x, y]))
        console.log('wouldColorChange: ', prevRgb, rgba)
        if (prevRgb[0] === rgba[0] && prevRgb[1] === rgba[1] && prevRgb[2] === rgba[2]) return false
        return true
    },
    addMany: function (input) {
        input.forEach(([tool, rgba, coors]) => { this.add(coors[0]!, coors[1]!, rgba, tool) })
    },
    init: function (history) {
        this.value.history = history
    },
    reset: function () { this.value = initValue },
}


// #region Types
import type { PainterToolState } from '@/zustand/store'

type X = number
type Y = number
type ToolName = PainterToolState['current']


type History = {
    rgb: Record<`${X}_${Y}`, Uint8ClampedArray>
    tool: Record<`${X}_${Y}`, ToolName>
}

type Value = {
    history: History
}

type Action = {
    get: () => History
    getRgb: (input: Uint16Array) => Uint8ClampedArray
    getTool: (input: Uint16Array) => ToolName | undefined
    addRgbsData: (input: Record<`${X}_${Y}`, Uint8ClampedArray>) => void
    add: (x: number, y: number, rgba: Uint8ClampedArray, tool?: ToolName) => void
    wouldColorChange: (x: number, y: number, rgba: Uint8ClampedArray) => boolean
    addMany: (input: [tool: ToolName, rgba: Uint8ClampedArray, coors: Uint8ClampedArray][]) => void
    init: (history: History) => void
    reset: () => void
}

type Store = { value: Value } & Action

export type PixelHistoryStoreValueHistory = History
export type PixelHistoryStoreValue = Value
export type PixelHistoryStoreAction = Action
export type PixelHistoryStore = Store
// #endregion
