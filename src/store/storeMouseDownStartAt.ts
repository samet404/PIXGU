
export const storeMouseDownStartAt: Actions & State = {
    value: null,
    set: function (input) {

        this.value = input
    }
}

type State = {
    value: null | Value
}

type Actions = {
    set: (input: Value) => void
}

type Value = {
    smooth: [x: number, y: number]
    exact: [x: number, y: number]
} 