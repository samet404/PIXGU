import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { currentSectionIndexAtom } from '../atoms'
import { useAtomValue } from 'jotai'

export const TipImage = () => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)
    const [images, setImages] = useState<StaticImageData[]>([])
    const currentImg = currentSelectedIndex === 4 ? null : images[currentSelectedIndex]

    useEffect(() => {
        if (currentImg === undefined)
            import(`@/png/tips-modal/${currentSelectedIndex}.png`)
                .then(img => setImages(images => {
                    const newImages = [...images]
                    newImages[currentSelectedIndex] = img
                    return newImages
                }))
                .catch(err => {
                    console.error('Failed to load image:', err);
                })
    }, [currentSelectedIndex])


    if (currentImg === undefined) return <div className='size-[10rem] bg-[#ffffff82] animate-fade animate-infinite'></div>
    if (currentImg === null) return null

    return <Image
        src={currentImg}
        alt="tips-modal-image"
        sizes='puts the size of the image here'
        className='size-[10rem] drop-shadow-[0_0px_10px_rgba(0,0,0,0.55)] rounded-lg'
    />
}