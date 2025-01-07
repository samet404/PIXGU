'use client'

import { useAtom } from 'jotai'
import { selectedPanelItemAtom } from '../../atom'
import type { Item as ItemName } from '..'
import { clsxMerge } from '@/utils/clsxMerge'

export const Item = ({ name, displayText }: Props) => {
    const [item, setItem] = useAtom(selectedPanelItemAtom)

    const mouseDown = () => setItem(name)

    return (
        <button onMouseDown={mouseDown} className={clsxMerge('flex items-center gap-2 first:rounded-l-md last:rounded-r-md px-3 py-1 text-[#000000c4]', {
            'bg-[#0000002e]': item === name
        })}>
            {displayText}
        </button>
    )
}

type Props = {
    name: ItemName
    displayText: string
}