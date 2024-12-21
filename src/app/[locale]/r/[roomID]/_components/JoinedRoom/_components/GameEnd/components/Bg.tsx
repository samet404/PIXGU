import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Bg = ({ isOpen }: Props) => {
    const [imgSrc, setImgSrc] = useState<StaticImageData | null>(null)
    const [isLoading, setisLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!isOpen || imgSrc) return

        import('@/png/bg2.png').then(m => {
            setImgSrc(m.default)
            setisLoading(false)
        })
        setisLoading(true)

    }, [isOpen])


    if (!imgSrc) return null
    if (isLoading) return <div className='absolute top-0 left-0 w-full bg-[#e1b9b9'></div>

    return <Image src={imgSrc} alt='bg' sizes='100vw' placeholder='blur' className='absolute top-0 left-0 object-fill w-full' />
}

type Props = {
    isOpen: boolean
}