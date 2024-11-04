"use client"

import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { isChildAtom } from './atoms'
import { useAtom } from 'jotai'

export const ChildrenAlert = ({ children }: PropsWithChildren) => {
    const [isChild, setIsChild] = useAtom(isChildAtom)

    if (isChild) return <div className='text-[#ffffffc4]  text-xs'>Sorry, to use PIXGU, you must be 13 or older. More information about PIXGU's age restrictions can be found in our <Link className='text-blue-400' href='/privacy'>Privacy Policy</Link>.</div>
    if (isChild === false) return children


    return (
        <div className='flex flex-col gap-8 justify-between h-full'>

            <div className='flex flex-col items-center gap-2'>
                <div className='text-white'>Is your age 13 or older?</div>
                <div className='flex flex-row gap-10 text-white'>
                    <button className='p-1' onMouseDown={() => setIsChild(false)}>Yes</button>
                    <button className='p-1' onMouseDown={() => setIsChild(true)}>No</button>
                </div>
            </div>

            <div className='text-[#ffffffc4] text-xs'>To use PIXGU, you must be 13 or older. More information about PIXGU's age restrictions can be found in our <Link className='text-blue-400' href='/privacy'>Privacy Policy</Link>.</div>
        </div>
    )
}