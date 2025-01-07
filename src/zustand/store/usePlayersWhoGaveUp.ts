import { filterObj } from '@/utils/filterObj'
import { create } from 'zustand'

const initState: State = {
    users: [],
    usersObj: {},
}

export const usePlayersWhoGaveUp = create<State & Action>((set, get) => ({
    ...initState,

    remove: (ID) => set({
        users: get().users.filter((id) => id !== ID),
        usersObj: filterObj(get().usersObj, ([k, v]) => k !== ID) as Record<string, boolean>
    }),
    isGaveUp: (ID) => get().users.includes(ID),
    add: (ID) => {
        set({
            users: [...get().users, ID],
            usersObj: { ...get().usersObj, [ID]: true }
        })
    },

    everyoneNotGaveUp: () => set({
        users: [],
        usersObj: Object.keys(get().usersObj).reduce((acc, key) => ({
            ...acc,
            [key]: false
        }), {})
    }),

    initPlayer: (ID) => set({ usersObj: { ...get().usersObj, [ID]: false } }),
    reset: () => set({ ...initState })
}))

type State = {
    usersObj: Record<string, boolean>
    users: string[]
}

type Action = {
    everyoneNotGaveUp: () => void
    isGaveUp: (ID: string) => boolean
    add: (ID: string) => void
    initPlayer: (ID: string) => void
    remove: (ID: string) => void
    reset: () => void
}