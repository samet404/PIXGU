import { create } from 'zustand'

const initState: State = {
    msgs: {},
    guessChatMsgCounts: {},
}

export const useHostPlayersMsgs = create<State & Action>((set, get) => ({
    ...initState,


    resetGuessChatMsgCountsOfUser: (userID) => {
        set({
            ...get(),
            guessChatMsgCounts: {
                ...get().guessChatMsgCounts,
                [userID]: 0
            }
        })
    },

    resetGuessChatMsgCounts: () => {
        set({
            ...get(),
            guessChatMsgCounts: {}
        })
    },

    increaseGuessChatMsgCount: (userID) => {
        set({
            ...get(),
            guessChatMsgCounts: {
                ...get().guessChatMsgCounts,
                [userID]: (get().guessChatMsgCounts[userID] ?? 0) + 1
            }
        })
    },

    addMsg: (userID, msg) => {
        const ID = get().msgs[userID]?.length ?? 0

        set({
            msgs: {
                ...get().msgs,
                [userID]: [
                    ...(get().msgs[userID] ?? []), {
                        ID,
                        msg
                    }
                ]

            }
        })

        return ID
    },
    reset: () => set({ ...initState })
}))

type State = {
    msgs: Record<string, {
        ID: number,
        msg: string,
    }[]>
    guessChatMsgCounts: Record<string, number>
}

type Action = {
    increaseGuessChatMsgCount: (userID: string) => void
    addMsg: (userID: string, msg: string) => number
    resetGuessChatMsgCountsOfUser: (userID: string) => void
    resetGuessChatMsgCounts: () => void
    reset: () => void
}