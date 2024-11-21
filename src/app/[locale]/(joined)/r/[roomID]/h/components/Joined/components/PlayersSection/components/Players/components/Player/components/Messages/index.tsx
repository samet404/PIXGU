import { useAtomValue } from 'jotai'
import { Content } from './Content'
import { isMessagesOpenAtom } from '../../atoms'

export const Messages = ({ userID }: Props) => {
    const isOpen = useAtomValue(isMessagesOpenAtom)[userID]

    if (isOpen) return (
        <div className='right-[2rem] absolute top-[3rem] w-[20rem] shadow-[0_0px_10px_1px_rgba(0,0,0,0.6)] p-1 overflow-y-scroll  h-[10rem] bg-[#ffffff8b] rounded-md backdrop-blur-lg'>
            <Content userID={userID} />
        </div>
    )
}

type Props = {
    userID: string
}