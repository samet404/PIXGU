const initValue: Value = {
    coors: [],
}

export const storePixelsOnBucket: Store = {
    value: initValue,

    get: function () { return this.value },

    add: function (coors) {
        this.value.coors.push(coors)
    },
    addMany: function (input) {
        this.value.coors.push(...input)
    },

    init: function (coors) {
        this.value = {
            ...this.value,
            coors
        }
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
type Coordinate = Uint16Array
type Value = {
    coors: Coordinate[]
}

type InitValue = {
    coors: []
}


type Action = {
    add: (input: Coordinate) => void
    addMany: (input: Coordinate[]) => void
    get: () => Value
    init: (coors: Coordinate[]) => void
    isExits: (input: Coordinate) => boolean
    reset: () => void
}

type Store = { value: Value } & Action

export type PixelsOnBucketStoreValue = Value
export type PixelsOnBucketStoreAction = Action
export type PixelsOnBucketStore = Store
// #endregion
