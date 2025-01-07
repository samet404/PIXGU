import { useAtomValue } from 'jotai'
import { themeAtom } from '../../../atom'

export const CoinAlert = ({ text }: Props) => {
    const theme = useAtomValue(themeAtom)

    if (theme === 'red') return <div className='text-[#ff000075]'>
        {text}
    </div>
}

type Props = {
    text: string
}
