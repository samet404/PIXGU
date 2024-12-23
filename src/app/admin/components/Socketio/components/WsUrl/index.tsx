import { useAtomValue } from 'jotai'
import { wsUrlAtom } from '../atoms'

export const WsUrl = () => {
    const wsUrl = useAtomValue(wsUrlAtom)

    return (
        <div className='text-white'>current wsUrl: {wsUrl}</div>
    )
}