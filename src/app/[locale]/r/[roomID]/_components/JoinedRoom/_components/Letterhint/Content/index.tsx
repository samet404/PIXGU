import type { LetterHintPowerupData } from '@/types/powerups'
import { useLetterHint } from '@/zustand/store'

export const Content = ({ data }: Props) => {
    const reset = useLetterHint((s) => s.reset)

    return (
        <div className='gap-5 flex-col bg-yellow-400 selection:bg- z-40 animate-fade w-full h-full absolute flex items-center justify-center left-0 top-0 drop-shadow-[0_0px_6px_#ffff00ff]'>

            <div className='flex flex-row gap-2 items-center text-[#ffffffb8] text-[3rem] '>
                {data.map((str) => <div key={str}>{str}</div>)}
            </div>
            <div className='flex flex-row gap-2'>
                {['Got it!', 'Thanks for the hint!', 'Aha!', 'Now I see! 👀']
                    .map((str) => <button key={str} onMouseDown={reset} className='text-[1rem] rounded-md px-2 text-[#000000b0] font-[500] py-1 bg-[#ffffff76]'>{str}</button>)}

            </div>
        </div>

    )
}


type Props = {
    data: LetterHintPowerupData[]
}