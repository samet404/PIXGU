'use client'

import { UserPfp } from '@/components/UserPfp'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useMyUserInfoForRoomStore } from '@/zustand/provider'

export const MyMsg = ({ msg, similarity }: Props) => {
    const user = useMyUserInfoForRoomStore((state) => state.user)
    const isGuest = 'ID' in user
    const myID = isGuest ? user?.ID : user?.id
    const name = isGuest ? user?.name : user?.usernameWithUsernameID
    const pfp = isGuest ? null : user?.profilePicture

    useEffectOnce(() => {
        const messageList = document.getElementById('guessChatMsgContainer')
        const scrollHeight = messageList!.scrollHeight
        const clientHeight = messageList!.clientHeight

        messageList!.scrollTop = scrollHeight - clientHeight
    })

    return (
        <div className="flex flex-row justify-start gap-[0.40rem] first:!mt-auto">
            <div className="flex shrink-0 pt-2">
                <UserPfp
                    ID={myID}
                    src={pfp}
                    width={32}
                    height={32}
                    alt="pfp"
                    // TODO sizes here pls
                    sizes="TODO"
                    className="flex size-6 flex-shrink-0 rounded-full bg-white"
                />
            </div>
            <div className="flex flex-col gap-1 items-start">
                <div className="line-clamp-1 text-ellipsis break-all pt-2 text-[0.9rem] leading-3 text-white">
                    {name ?? myID}
                </div>
                <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
                    {msg}
                </div>
                {typeof similarity === 'number' ? <div className='bg-rose-500 flex rounded-md drop-shadow-md'>
                    <div style={{
                        backgroundColor: `rgba(2,235,137,${similarity.toFixed(2)})`,
                    }} className='text-[#ffffffb4] flex text-xs px-[0.2rem] py-[0.1rem] rounded-md'>
                        {(similarity * 100).toFixed(2)} %
                    </div>
                </div> : null}
            </div>
        </div >
    )
}

type Props = {
    similarity?: number
    msg: string
}
