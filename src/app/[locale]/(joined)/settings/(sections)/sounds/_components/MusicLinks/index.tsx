import { AddItem } from './_components/AddItem'
import { Items } from './_components/Items'

export const MusicLinks = () => {
    return (
        <div className='flex flex-col gap-2 text-[#000000b1]'>
            Music player links
            <div className='flex flex-col gap-2 '>
                <AddItem />
                <div className='flex flex-col'>
                    <Items />
                </div>
            </div>
        </div>
    )
}