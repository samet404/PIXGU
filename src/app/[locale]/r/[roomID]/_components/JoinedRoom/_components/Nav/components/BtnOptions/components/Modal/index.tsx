import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { useOnClickOutside } from 'usehooks-ts'
import { type KeyboardEvent, useRef } from 'react'
import { Urbanist } from 'next/font/google'
import { Exit } from './components/Exit'
import { Back } from './components/Back'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { Controls } from './components/Controls'
import { Sounds } from './components/Sounds'
import type { LangObj } from '../../../../../../lang'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['500',],
})

export const Modal = ({ langObj }: Props) => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsModalOpen(false))

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsModalOpen(false)
  }

  useEffectOnce(() => {
    return () => {
      setIsModalOpen(false)
    }
  })

  return (
    <div
      className={`${urbanist.className} animate-fade absolute top-0 z-50 flex h-full w-full  items-center justify-center bg-[#000000a5] flex-col gap-5 backdrop-blur-md animate-duration-200`}
    >
      <div className='hidden'>Sometimes the deepest rivers are the quietest.</div>

      <div
        onKeyDown={handleOnKeyDown}
        ref={ref}
        className="flex flex-col rotate-[-5deg] animate-flip-up rounded-md bg-[#ffffffb2] shadow-[0_0px_20px_1px_rgba(0,0,0,0.4)]"
      >
        <Back text={langObj.back} />
        <Controls text={langObj.controls} />
        <Sounds text={langObj.sounds} />
        <Exit text={langObj.exit} />
      </div>
    </div>
  )
}


type Props = {
  langObj: LangObj['nav']['btnOptions']
}