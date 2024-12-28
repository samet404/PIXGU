import { useAtom } from 'jotai'
import { isOpenAtom } from './atom'
import { Svg } from '@/components/Svg'

export const MoreBtn = () => {
    const [open, setOpen] = useAtom(isOpenAtom)

    return (
        <button className='p-1' onMouseDown={() => setOpen(!open)}>
            <Svg src='more-vertical-svgrepo-com.svg' className='rotate-90 opacity-50 w-5 rounded-full' alt='more' />
        </button>
    )
}