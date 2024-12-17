import { create } from 'zustand'

type State = {
    isOpen: boolean
}

type Action = {
    switch: () => void
    reset: () => void
}

const initValue: State = {
    isOpen: false,
}

export const useWebRTCTroubleshootingGuideModal = create<State & Action>((set, get) => ({
    ...initValue,

    switch: () =>
        set({
            isOpen: !get().isOpen,
        }),
    reset: () => set(initValue),
}))
