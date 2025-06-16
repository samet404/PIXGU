

import { useAmILoser } from '@/zustand/store/useAmILoser'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'

export const getYouLosedAsGuessr = () => {
    useGuessChatLayout.getState().setNotAvailable()
    useGeneralChatLayout.getState().setAvailable()
    useAmILoser.getState().losed()
}