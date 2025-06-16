import { useSoundSettings } from '@/zustand/store/useSoundSettings'
import Link from 'next/link'

export const Item = ({ link, openDesc, removeDesc }: Props) => {
    const removeMusicLink = useSoundSettings((s) => s.removeMusicLink)

    return (
        <div className='flex flex-row last:rounded-b-md items-center  justify-between first:rounded-t-md bg-[#ffffff5e] pl-2 pr-1 py-1 gap-4 text-[0.8rem] text-[#0000009b]'>
            {`https://youtu.be/${link}`}
            <div className='flex flex-row gap-1 items-center'>
                <button className='rounded-sm  p-1 bg-rose-500 text-[#ffffff98]' onMouseDown={() => removeMusicLink(link)}>{removeDesc}</button>
                <Link className='rounded-sm  p-1 bg-[#55d99b] text-[#ffffff98]' prefetch={false} target='_blank' href={link}>{openDesc}</Link>
            </div>
        </div>
    )
}

type Props = {
    removeDesc: string
    openDesc: string
    link: string
}