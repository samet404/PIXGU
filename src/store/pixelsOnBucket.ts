const initValue: Value = {
    coors: [],
}

export const storePixelsOnBucket: Store = {
    value: initValue,

    get: function () { return this.value },

    add: function ([x, y]) {
        this.value.coors.push([x, y])
    },

    isExits: function ([x, y]) {
        return this.value.coors.some(([x2, y2]) => x === x2 && y === y2)
    },
    reset: function () {
        const value: InitValue = {
            coors: [],
        } as const

        this.value = value
    },
}



// #region Types
type Coordinate = [x: number, y: number];
type Value = {
    coors: [x: number, y: number][]
}

type InitValue = {
    coors: []
}


type Action = {
    add: (input: [x: number, y: number]) => void
    get: () => Value
    isExits: (input: [x: number, y: number]) => boolean
    reset: () => void
}

type Store = { value: Value } & Action

export type PixelsOnBucketStoreValue = Value
export type PixelsOnBucketStoreAction = Action
export type PixelsOnBucketStore = Store
// #endregion
