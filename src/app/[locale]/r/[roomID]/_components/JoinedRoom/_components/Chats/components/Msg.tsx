'use client'

import { usePlayers } from '@/zustand/store/usePlayers'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { UserPfp } from '@/components/UserPfp'

export const Msg = ({ ID, msg, similarity }: Props) => {
    const player = usePlayers((s) => s.getPlayer(ID))

    useEffectOnce(() => {
        const messageList = document.getElementById('msgContainer')
        const scrollHeight = messageList!.scrollHeight
        const clientHeight = messageList!.clientHeight

        messageList!.scrollTop = scrollHeight - clientHeight
    })

    if (!player) return null

    return (
        <div className="flex flex-row justify-start gap-[0.40rem] first:!mt-auto">
            <UserPfp
                ID={ID}
                src={player.profilePicture}
                width={32}
                height={32}
                alt="pfp"
                // TODO sizes here pls
                sizes="TODO"
                className="flex-shrink-1 flex size-8 rounded-full border-[0.1rem] border-white bg-white"
            />
            <div className="flex flex-col gap-1 items-start">
                <div className="overflow-ellipsis text-[1rem] leading-3 text-white">
                    {player.usernameWithUsernameID ?? ID}
                </div>
                <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
                    {msg}
                </div>

                {typeof similarity === 'number' && <div className='bg-rose-500 flex rounded-md drop-shadow-md'>
                    <div style={{
                        backgroundColor: `rgba(2,255,167,${similarity.toFixed(2)})`,
                    }} className='text-[#ffffffe8]  flex text-xs px-[0.2rem] py-[0.1rem] rounded-md'>
                        <div className='drop-shadow-[0_0px_3px_rgba(0,0,0,0.65)]'>{(similarity * 100).toFixed(2)} %</div>
                    </div>
                </div>}
            </div>

        </div>
    )
}

type Props = {
    ID: string
    msg: string
    similarity?: number
}
