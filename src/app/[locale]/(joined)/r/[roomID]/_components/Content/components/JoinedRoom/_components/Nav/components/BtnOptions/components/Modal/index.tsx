import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { useOnClickOutside } from 'usehooks-ts'
import { type KeyboardEvent, useRef } from 'react'
import { Urbanist } from 'next/font/google'
import { Exit } from './components/Exit'
import { Back } from './components/Back'
import { Options } from './components/Options'
import { useEffectOnce } from '@/hooks/useEffectOnce'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['500', '700'],
})

const Modal = () => {
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
      <div className='text-[rgba(255,255,255,0.01)] text-[2rem] font-[900]'>Sometimes the deepest rivers are the quietest.</div>

      <div
        onKeyDown={handleOnKeyDown}
        ref={ref}
        className="flex flex-col rotate-[-5deg] animate-throw rounded-md bg-[#ffffffb2] shadow-[0_0px_20px_1px_rgba(0,0,0,0.4)]"
      >
        <Back />
        <Options />
        <Exit />
      </div>
    </div>
  )
}
export default Modal
