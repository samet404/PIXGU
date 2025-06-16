import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { Input } from './Input'

export const GuessInput = () => {
    const guessCount = useRoomGuessChatMsgsStore((s) => s.myMsgCount)

    return <Input name='guessChat' placeholder={`${guessCount}/10`} />
}