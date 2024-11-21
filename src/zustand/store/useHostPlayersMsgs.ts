import { create } from 'zustand'

const initState: State = {
    msgs: {}
}

export const useHostPlayersMsgs = create<State & Action>((set, get) => ({
    ...initState,

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
}

type Action = {
    addMsg: (userID: string, msg: string) => number
    reset: () => void
}