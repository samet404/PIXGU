"use client"

import { useAtom } from 'jotai'
import { currentSectionIndexAtom } from '../atoms'
import { clsxMerge } from '@/utils/clsxMerge'
import { useGuide } from '@/zustand/store'

export const NextBackBtn = ({ type }: Props) => {
    const [currentIndex, setCurrentIndex] = useAtom(currentSectionIndexAtom)

    const handleClick = () => {
        if (type === 'next') {
            if (currentIndex === 3) useGuide.setState({ first: false })
            setCurrentIndex(currentIndex + 1)

        }
        else {
            if (currentIndex === 1) return
            setCurrentIndex(currentIndex - 1)
        }
    }

    return (
        <button onMouseDown={handleClick} className={clsxMerge('text-[#000000a0] font-[500] flex first:rounded-l-md last:rounded-r-md grow items-center justify-center bg-white px-2 py-1', {
            'bg-gray-200': (type === 'back' && currentIndex === 1) || (type === 'next' && currentIndex === 4),

        })}>
            {type === 'next' ? currentIndex === 3 ? 'Got it!' : 'Next' : 'Back'}
        </button>
    )
}

type Props = {
    type: 'next' | 'back'
}