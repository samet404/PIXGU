import React, { useEffect, useRef, useState } from 'react'
import { sceneAtom, textDataAtom } from '../atoms'
import { useAtom } from 'jotai'
import { Inter } from 'next/font/google'
import { useEffectOnce, useInterval } from 'usehooks-ts'

const inter400 = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const TextSection = async () => {
  console.log('text section rendered')
  const [text, setText] = useState()
  const [scene] = useAtom(sceneAtom)
  
  // setText(() => {
  //   // switch (scene) {
  //   //   case 1:
  //   //   case 2:
  //   //   case 3:
  //   //   default:
  //   // }
  // })

  return (
    <div
      className={`${inter400.className} max-w-[90%] bg-[rgba(255,255,255,0.2)] p-2 text-sm text-[rgba(255,255,255,0.6)]`}
    >
      {text}
    </div>
  )
}

export default TextSection
