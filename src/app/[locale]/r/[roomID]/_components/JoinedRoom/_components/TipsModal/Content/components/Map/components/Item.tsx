import { clsxMerge } from '@/utils/clsxMerge'
import { useAtomValue } from 'jotai'
import { currentSectionIndexAtom } from '../../../atoms'

export const Item = ({ type }: Props) => {
    const selectedIndex = useAtomValue(currentSectionIndexAtom)

    return <div className={clsxMerge('h-full w-[33.3%] duration-500 transition-colors bg-[#0000003b]', {
        'bg-[#ffffffb5]': selectedIndex === type
    })}></div>
}

type Props = {
    type: 1 | 2 | 3
}