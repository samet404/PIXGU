import type { GameLog } from '@/types/webRTCConnData'
import { create } from 'zustand'

type State = {
    msgs: GameLog['data'][]
}

type Action = {
    add: (data: GameLog['data']) => void
    reset: () => void
}

export const useGameLogs = create<State & Action>((set) => ({
    msgs: [],

    add: (data) => {
        set((state) => {
            const prev = (() => {
                const msgs = state.msgs
                if (msgs.length === 30) return msgs.slice(1, 30)
                return msgs
            })()

            return { msgs: [...prev, data] }
        })
    },

    reset: () => set({ msgs: [] }),
}))