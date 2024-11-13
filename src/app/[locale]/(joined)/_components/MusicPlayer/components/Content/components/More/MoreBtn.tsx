import Image from 'next/image'
import more from '@/svg/more-vertical-svgrepo-com.svg'
import { useAtom } from 'jotai'
import { isOpenAtom } from './atom'

export const MoreBtn = () => {
    const [open, setOpen] = useAtom(isOpenAtom)

    return (
        <button className='p-1' onMouseDown={() => setOpen(!open)}>
            <Image src={more} className='rotate-90 opacity-50 w-5 rounded-full' alt='more' />
        </button>
    )
}