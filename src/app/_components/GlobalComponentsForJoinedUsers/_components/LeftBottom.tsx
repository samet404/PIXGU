import { BuyMeCoffee } from './BuyMeCoffee'
import { MusicPlayer } from './MusicPlayer'

export const LeftBottom = () => {
    return (
        <div className='flex flex-row gap-2 absolute bottom-0 left-0 p-2 items-end'>
            <MusicPlayer />
            <BuyMeCoffee />
        </div>
    )
}