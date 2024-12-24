import Image, { type StaticImageData } from 'next/image'
import { currentSectionIndexAtom } from '../atoms'
import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'

export const TipImage = () => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)
    const [images, setImages] = useState<StaticImageData[]>([])
    const currentImg = currentSelectedIndex === 4 ? null : images[currentSelectedIndex]

    useEffect(() => {
        if (currentImg === undefined) {
            import(`@/png/tips-modal/${currentSelectedIndex}.png`)
                .then(img => {
                    setImages(images => {
                        const newImages = [...images]
                        newImages[currentSelectedIndex] = img
                        return newImages
                    })
                })
                .catch(err => {
                    console.error('Failed to load image:', err);
                })
        }
    }, [currentSelectedIndex])

    if (currentImg === undefined) return <div className='w-[50rem] bg-[#ffffff59] h-full absolute top-0 left-0 flex items-center justify-center'></div>
    if (currentImg === null) return null

    return <div className='w-full h-full flex items-center justify-center absolute top-0 left-0'>
        <Image
            src={currentImg}
            alt="tips-modal-image"
            sizes='100vw'
            placeholder='blur'
            className='w-[50rem] left-0 top-0 drop-shadow-[0_0px_20px_rgba(0,0,0,0.8)] rounded-lg'
        />
    </div>
}