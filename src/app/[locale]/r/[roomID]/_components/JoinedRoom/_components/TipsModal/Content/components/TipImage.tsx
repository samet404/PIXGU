import Image from 'next/image'
import { currentSectionIndexAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import img1 from '@/png/tips-modal/1.png'
import img2 from '@/png/tips-modal/2.png'
import img3 from '@/png/tips-modal/3.png'


export const TipImage = () => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)

    const currentImg = (() => {
        switch (currentSelectedIndex) {
            case 1:
                return img1
            case 2:
                return img2
            case 3:
                return img3
        }
    })()

    return <div className='w-full h-full flex items-center justify-center absolute top-0 left-0'>
        <Image
            src={currentImg!}
            alt="tips-modal-image"
            sizes='100vw'
            placeholder='blur'
            className='w-[50rem] left-0 top-0 drop-shadow-[0_0px_20px_rgba(0,0,0,0.8)] rounded-lg'
        />
    </div>
}