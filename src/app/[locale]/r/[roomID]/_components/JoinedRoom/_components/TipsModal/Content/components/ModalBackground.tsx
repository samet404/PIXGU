import { clsxMerge } from '@/utils/clsxMerge'
import { useAtomValue } from 'jotai'
import type { PropsWithChildren } from 'react'
import { currentSectionIndexAtom } from '../atoms'

export const ModalBackground = ({ children }: Props) => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)

    return (
        <div className={clsxMerge('size-[20rem] flex flex-col justify-between rounded-md bg-[#ffffffbb] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] animate-fade-down backdrop-blur-lg', {
            'bg-[#c54bfe]': currentSelectedIndex === 1,
            'bg-[#4bc0fe]': currentSelectedIndex === 2,
            'bg-[#f8c220]': currentSelectedIndex === 3,
            'bg-[#2cff6ca0]': currentSelectedIndex === 4,

        })}>
            {children}
        </div>
    )
}

type Props = PropsWithChildren
