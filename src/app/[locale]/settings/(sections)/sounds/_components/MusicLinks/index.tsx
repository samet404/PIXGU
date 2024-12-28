import { AddItem } from './_components/AddItem'
import { Items } from './_components/Items'

export const MusicLinks = ({ addItem, removeItem, musicLinkOpen, title }: Props) => {
    return (
        <div className='flex flex-col gap-2 text-[#000000b1]'>
            {title}
            <div className='flex flex-col gap-2 '>
                <AddItem addItemDesc={addItem} />
                <div className='flex flex-col'>
                    <Items openDesc={musicLinkOpen} removeDesc={removeItem} />
                </div>
            </div>
        </div>
    )
}

type Props = {
    title: string
    addItem: string
    musicLinkOpen: string
    removeItem: string
}