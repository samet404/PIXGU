"use client"

import { useSoundSettings } from '@/zustand/store'
import { Item } from './Item'

export const Items = ({ removeDesc, openDesc }: Props) => {
    const items = useSoundSettings((s) => s.musicLinks)
    return items.map((link) => <Item key={link} link={link} removeDesc={removeDesc} openDesc={openDesc} />)
}

type Props = {
    openDesc: string
    removeDesc: string
}