import { create } from 'zustand'

const initState: State = {
    value: {
        'letterHint': 100,
    }
}

export const useMarketplacePrices = create<State & Action>((set, get) => ({
    ...initState,
}))

type State = {
    value: Record<string, number>
}

type Action = object