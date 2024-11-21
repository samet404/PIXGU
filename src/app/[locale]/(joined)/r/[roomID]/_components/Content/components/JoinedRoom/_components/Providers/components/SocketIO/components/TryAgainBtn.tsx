import { useState } from 'react'

export const TryAgainBtn = ({ tryAgain }: Props) => {
    const [tryAgainCount, setTryAgainCount] = useState<number>(0)

    const tryAgainTxt = () => {
        const count = tryAgainCount
        if (count >= 0 && count < 10) return 'Try again'
        if (count >= 10 && count < 30) return 'Try again...'
        if (count >= 30 && count < 50) return 'Seriously? Still clicking?'
        if (count >= 50 && count < 70) return 'Wow. You really have nothing better to do huh?'
        if (count >= 70 && count < 90) return 'Are you just clicking to annoy me now?'
        if (count >= 90 && count < 140) return 'I can do this all day you know...'
        if (count >= 140 && count < 190) return 'You must be REALLY bored at work'
        if (count >= 190 && count < 210) return 'Have you tried getting a hobby? Just asking...'
        if (count >= 210 && count < 420) return 'Did you fall asleep on the mouse?'
        if (count >= 420 && count < 440) return 'My grandma clicks faster than you'
        if (count >= 440 && count < 460) return 'Plot twist: This button does nothing. Or maybe it does.'
        if (count >= 460 && count < 560) return 'Breaking News: Local User Refuses to Give Up'
        if (count >= 560) return "Okay. Fine. You win. Happy now?"
    }

    return (
        <button onMouseDown={() => {
            if (tryAgainCount < 30) {
                tryAgain()
            }

            setTryAgainCount(prev => prev + 1)
        }} className='rounded-md bg-[#ffffff2b] px-2 py-1'>
            {tryAgainTxt()}
        </button>
    )
}

type Props = {
    tryAgain: () => void
}