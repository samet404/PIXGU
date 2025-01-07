import { useAmIGaveUp, useGeneralChatLayout, useGuessChatLayout, useWhoIsPainterClient } from '@/zustand/store'

export const giveUp = (myUserID: string) => {
    if (useWhoIsPainterClient.getState().value.painterID === myUserID) return

    useAmIGaveUp.getState().giveUp()
    useGeneralChatLayout.getState().setAvailable()
    useGuessChatLayout.getState().setNotAvailable()
}