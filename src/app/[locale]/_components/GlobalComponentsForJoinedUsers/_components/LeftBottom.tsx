import type { Locale } from '@/types'
import { BuyMeCoffee } from './BuyMeCoffee'
import { MusicPlayer } from './MusicPlayer'


export const LeftBottom = ({ locale }: Props) => {

    return (
        <div className='flex flex-row gap-2 absolute bottom-0 left-0 p-2 items-end'>
            <MusicPlayer />
            <BuyMeCoffee locale={locale} />
        </div>
    )
}

type Props = {
    locale: Locale
}