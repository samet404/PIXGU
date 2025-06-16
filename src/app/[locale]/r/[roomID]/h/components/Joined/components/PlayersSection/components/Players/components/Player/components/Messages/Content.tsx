import { useHostPlayersMsgs } from '@/zustand/store/useHostPlayersMsgs'

export const Content = ({ userID }: Props) => {
    const msgs = useHostPlayersMsgs(s => s.msgs[userID])

    return msgs?.map(({ ID, msg }) => (
        <div key={ID} className='text-white text-sm border-b-2 border-b-[#ffffff4a] px-2 py-1'>
            {msg}
        </div>
    ))
}

type Props = {
    userID: string
}