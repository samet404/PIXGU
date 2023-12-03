'use client'

import Image from 'next/image'

import img1 from '@/png/stories/1.png'
// eslint-disable-next-line no-unused-vars
import img2 from '@/png/stories/2.png'
// eslint-disable-next-line no-unused-vars
import img3 from '@/png/stories/3.png'
import { useAtom } from 'jotai'
import { imgAtom, sceneAtom, splitedTextDataAtom } from './atoms'
import TextSection from './components/TextSection'
import { Inter } from 'next/font/google'
import { textDataAtom } from './atoms'

const inter400 = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const FirstStory = () => {
  console.log('FirstStory Rendered!')

  const [scene, setScene] = useAtom(sceneAtom)
  const [img, setImg] = useAtom(imgAtom)


  setImg(() => {
    switch (scene) {
      case 1:
        return img1
      case 2:
        return img2
      case 3:
        return img3
      default:
        return img3
    }
  })

  const handlePreviousButton = () => {
    if (scene !== 1) setScene((prev: number) => prev - 1)
  }

  const handleNextButton = () => {
    if (scene !== 3) setScene((prev: number) => prev + 1)
  }
  return (
    <div className="absolute z-50 flex h-full w-full flex-col items-center gap-4 overflow-y-auto bg-[black] py-10">
      <Image
        src={img}
        quality={90}
        className="h-96 w-96 object-contain"
        alt="story image"
        placeholder="blur"
        sizes='sizes="(min-width: 460px) calc(9.37vw + 360px), calc(82.86vw + 36px)'
      />

      <TextSection />

      <div className="flex flex-row gap-3">
        <button
          className="rounded-md bg-yellow-200 px-5 py-2 font-[900]"
          onClick={() => handlePreviousButton()}
        >
          {'<'}
        </button>
        <button
          className="rounded-md bg-yellow-200 px-5 py-2 font-[900]"
          onClick={() => handleNextButton()}
        >
          {'>'}
        </button>
        <button
          className={`${inter400.className} rounded-md bg-[#ff7688] px-5 py-2`}
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default FirstStory
