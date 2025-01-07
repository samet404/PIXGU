import { useAmILoser, useGeneralChatLayout, useGuessChatLayout } from '@/zustand/store'

export const getYouLosedAsGuessr = () => {
    useGuessChatLayout.getState().setNotAvailable()
    useGeneralChatLayout.getState().setAvailable()
    useAmILoser.getState().losed()
}