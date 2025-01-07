'use client'

import { useAtom } from 'jotai'
import { useRef, type PropsWithChildren } from 'react'
import { roomPasswordAtom } from '../../atoms'

export const Content = ({ children }: Props) => {
    const [password, setPassword] = useAtom(roomPasswordAtom)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const submit = () => {
        if (!inputRef.current) return
        setPassword(inputRef.current.value)
    }

    if (password) return children
    return (
        <div className='flex  w-full h-full items-center  flex-col justify-center animate-fade'>
            <div className='text-white text-[2rem] font-[700]'>Password</div>
            <div className='flex flex-row'>
                <input ref={inputRef} type="text" className='px-2 py-1 bg-[#ffffff92]' /> <button className='bg-[#ffffffb1] px-2 py-1 font-[600]' onMouseDown={submit}>Submit</button>

            </div>
        </div>
    )

}


type Props = PropsWithChildren