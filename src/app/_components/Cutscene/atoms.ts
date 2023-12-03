import img1 from '@/png/stories/1.png'

import { atom } from 'jotai'
import { type StaticImageData } from 'next/image'

export const sceneAtom = atom<number>(1)

export const imgAtom = atom<StaticImageData>(img1)

export const inputData1Atom = atom<string>('inputData1Atom is undefined')

export const textDataAtom = atom<{
  text: string
  scene: number
}>({
  text: 'textDataAtom is undefined',
  scene: 1,
})