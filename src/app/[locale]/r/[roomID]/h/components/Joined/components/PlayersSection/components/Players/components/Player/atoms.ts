import { atom } from 'jotai'

export const isMessagesOpenAtom = atom<Record<string, boolean>>({})

export const switchMessagesAtom = atom(null, (get, set, ID: string) =>
    set(isMessagesOpenAtom, (prev) => ({
        ...prev,
        [ID]: prev[ID] === undefined ? true : !prev[ID],
    })),
)
