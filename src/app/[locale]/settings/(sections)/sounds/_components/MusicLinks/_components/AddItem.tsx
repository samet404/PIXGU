"use client"

import { YoutubeLinkSchema } from '@/zod/schema'
import { useSoundSettings } from '@/zustand/store'
import { useRef, useState } from 'react'

export const AddItem = ({ addItemDesc }: Props) => {
    const add = useSoundSettings((s) => s.addMusicLink)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleOnClick = () => {
        if (!inputRef.current) return
        const link = inputRef.current.value
        inputRef.current.value = ''

        try {
            YoutubeLinkSchema.parse(link)
        } catch (error) {
            // @ts-ignore
            setError(JSON.parse(error)[0].message)
            return
        }

        const ID = link.replace('https://youtu.be/', '')

        if (useSoundSettings.getState().musicLinks.includes(ID)) {
            setError('Link already exists')
            return
        }

        setError(null)
        add(ID)
    }

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex flex-row'>
                <input ref={inputRef} type="text" className='p-1 text-sm rounded-l-md bg-[#ffffff5e] text-[#000000a5]' />
                <button className='rounded-r-md bg-[#47d69a] px-2 py-1 text-[#0000006b]' onMouseDown={handleOnClick} >{addItemDesc}</button>
            </div>
            {error && <div className='text-[#9e4848] text-sm'>{error}</div>}
        </div>
    )
}

type Props = {
    addItemDesc: string
}