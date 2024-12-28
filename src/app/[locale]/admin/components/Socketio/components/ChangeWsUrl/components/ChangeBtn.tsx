import { useSetAtom } from 'jotai'
import { wsUrlAtom, type WsUrl } from '../../atoms'

export const ChangeBtn = ({ wsUrl }: Props) => {
    const setWsUrl = useSetAtom(wsUrlAtom)

    return (
        <button onMouseDown={() => setWsUrl(wsUrl)} className='px-2 py-1 bg-orange-600'>connect {wsUrl}</button>
    )
}

type Props = {
    wsUrl: WsUrl
}