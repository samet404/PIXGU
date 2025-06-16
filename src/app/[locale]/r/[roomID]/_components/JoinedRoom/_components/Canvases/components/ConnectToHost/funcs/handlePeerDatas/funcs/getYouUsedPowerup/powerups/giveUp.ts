import { useAmIGaveUp } from '@/zustand/store/useAmIGaveUp'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'

export const giveUp = (myUserID: string) => {
    if (useWhoIsPainterClient.getState().value.painterID === myUserID) return

    useAmIGaveUp.getState().giveUp()
    useGeneralChatLayout.getState().setAvailable()
    useGuessChatLayout.getState().setNotAvailable()
}