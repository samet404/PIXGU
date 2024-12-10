'use client'

import { Fragment, type PropsWithChildren } from 'react'
import { Input } from './components/Input'

export const ChatWrapper = ({
    input,
    name,
    haveAccess,
    children
}: Props) => {
    return (
        <div className="flex w-full relative grow animate-fade flex-col gap-2 rounded-lg overflow-y-auto">
            {
                !!haveAccess ? <Fragment>
                    <div className='left-2 top-1 z-[10] text-[#ffffff66] backdrop-blur-sm  px-1 rounded-md absolute text-sm'>{name}</div>
                    <div
                        style={{
                            overflowAnchor: 'auto',
                        }}
                        id='msgContainer'
                        className="chatMsgContainer flex h-full w-full grow flex-col gap-2 overflow-y-scroll rounded-md bg-[#ffffff13] py-1 pl-2 pr-1"
                    >
                        {children}
                    </div>
                    {input ? <Input name={name} /> : null}
                </Fragment> : <div className='text-[#ffffff80]'>Chat access unlocks after winning the match.</div>
            }

        </div>
    )
}

type Props = PropsWithChildren<{
    name: 'guessChat' | 'winnersChat'
    input: boolean
    haveAccess: boolean
}>
