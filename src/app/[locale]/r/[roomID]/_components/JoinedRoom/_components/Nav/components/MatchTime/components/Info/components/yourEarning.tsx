import { MATCH_TIME_MINUTES, } from '@/constants'
import { useMatchStatusClient, useWhoIsPainterClient } from '@/zustand/store'
import { useAtomValue } from 'jotai'
import { themeAtom } from '../../../atom'

const totalCoinBonus = MATCH_TIME_MINUTES * 80

export const YourEarning = ({ coinsText, guesserText, painterText }: Props) => {
    const theme = useAtomValue(themeAtom)
    const amIPainter = useWhoIsPainterClient(s => s.value.amIPainter)
    const passedSeconds = useMatchStatusClient(s => s.passedSeconds)
    if (!passedSeconds) return null

    const currentEarn = parseFloat(((totalCoinBonus - passedSeconds) * (theme === 'red' ? 0.5 : 1)).toFixed(0))

    const text = (() => {
        if (amIPainter) return painterText
        return guesserText
    })()

    return (
        <div className='text-yellow-600'>{text} {currentEarn} {coinsText}</div>
    )
}

type Props = {
    painterText: string
    guesserText: string
    coinsText: string
}