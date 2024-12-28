"use client"

import { useControls, type ControlsState } from '@/zustand/store'
import { Item } from './_components/Item'

export const Items = ({ names }: Props) => {
    const keys = useControls(s => s.getKeys())
    console.log('keys', names)
    return keys.map((key) => <Item key={key} name={key} displayName={names[key as keyof ControlsState['keys']]} />)
}

type Props = {
    names: Record<keyof ControlsState['keys'], string>
}