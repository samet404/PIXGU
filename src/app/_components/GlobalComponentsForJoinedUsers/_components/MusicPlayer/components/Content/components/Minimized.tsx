import { useAtom } from 'jotai'
import { isMinimizedAtom } from '../atoms'
import { Svg } from '@/components/Svg'

export const Minimized = () => {
    const [isMinimized, setIsMinimized] = useAtom(isMinimizedAtom)

    if (isMinimized) return <button
        onMouseDown={() => setIsMinimized(false)}
        className={'group z-[99] flex animate-fade flex-row items-center size-10  p-2 rounded-full bg-gradient-to-tr from-[#d417ff] to-[#ff6600] to-[50%] hover:scale-90 duration-200 drop-shadow-[0_0px_6px_#f44f33] backdrop-blur-lg'}
    >
        <Svg src='music-note-fill-svgrepo-com.svg' className="w-full h-full rounded-full" alt='music' />
    </button>
}