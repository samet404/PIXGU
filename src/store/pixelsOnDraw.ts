const initValue: Value = {
    value: [],
    lastPixel: null,
    isExitsCheckResults: null
}

export const storePixelsOnDraw: Store = {
    value: initValue,

    get: function () { return this.value },

    set: function ([x, y]) {
        this.value = {
            ...this.value,
            value: [...this.value.value, [x, y]]
        }
    },

    setLastPixel: function (input) {
        this.value = {
            ...this.value,
            lastPixel: input
        }
    },

    isExits: function ([x, y]) {
        const mainValue = this.value
        const { value } = mainValue

        const isExits = value.some(([x2, y2]) => x === x2 && y === y2)

        const isExitsCheckResults = (() => {
            const curr = mainValue.isExitsCheckResults
            const currNewResult = {
                result: isExits,
                x,
                y
            }

            if (!curr) return [null, currNewResult] as Value['isExitsCheckResults']

            curr.push(currNewResult)
            curr.shift()
            return curr as Value['isExitsCheckResults']
        })()

        this.value = {
            ...mainValue,
            isExitsCheckResults: isExitsCheckResults
        }

        return isExits
    },
    reset: function () { this.value = initValue },
}



// #region Types
type Value = {
    value: [x: number, y: number][]
    lastPixel: [x: number, y: number] | null
    isExitsCheckResults: [prev: {
        result: boolean
        x: number
        y: number
    } | null, current: {
        result: boolean
        x: number
        y: number
    }] | null
}



type Action = {
    set: (input: [x: number, y: number]) => void
    get: () => Value
    isExits: (input: [x: number, y: number]) => boolean
    setLastPixel: (input: [x: number, y: number] | null) => void
    reset: () => void
}

type Store = { value: Value } & Action

export type PixelsOnDrawStoreValue = Value
export type PixelsOnDrawStoreAction = Action
export type PixelsOnDrawStore = Store
// #endregion
