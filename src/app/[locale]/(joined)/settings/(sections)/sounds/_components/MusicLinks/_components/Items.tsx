"use client"

import { useSoundSettings } from '@/zustand/store'
import { Item } from './Item'

export const Items = () => {
    const items = useSoundSettings((s) => s.musicLinks)
    return items.map((link) => <Item key={link} link={link} />)
}