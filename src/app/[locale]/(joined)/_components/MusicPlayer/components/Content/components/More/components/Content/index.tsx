import { useAtom } from 'jotai'
import { isMinimizedAtom } from '../../../../atoms'
import { StayhereBtn } from './components/StayhereBtn'
import { isOpenAtom } from '../../atom'
import { useEffect, useRef } from 'react'

export const Content = () => {
    const [isOpen, setOpen] = useAtom(isOpenAtom)
    const [minimized, setMinimized] = useAtom(isMinimizedAtom)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (minimized) setOpen(false)
    }, [minimized])

    if (isOpen) return (
        <div ref={ref} className='absolute bottom-7 z-[40] left-2 '>
            <div className='bg-[#ffffff97]  rounded-md  flex backdrop-blur-md shadow-md flex-col  w-[10rem]  gap-1'>
                <button onMouseDown={() => setMinimized(true)} className='hover:bg-[#ffffff24] py-1 duration-200'>
                    Minimize
                </button>
                <StayhereBtn />
            </div>
        </div>)
}