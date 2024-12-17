"use client"

import { useControls } from '@/zustand/store'
import { Item } from './_components/Item'

export const Items = () => {
    const keys = useControls(s => s.getKeys())

    return keys.map((key) => <Item key={key} name={key} />)
}