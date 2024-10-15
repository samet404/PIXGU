import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { useOnClickOutside } from 'usehooks-ts'
import { type KeyboardEvent, useRef } from 'react'
import { Urbanist } from 'next/font/google'
import BtnYes from './components/BtnYes'
import BtnNo from './components/BtnNo'

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

  return (
    <div
      className={`${urbanist.className} absolute top-0 z-50 flex h-full w-full animate-fade items-center justify-center bg-[#000000a5] backdrop-blur-md animate-duration-200`}
    >
      <div
        onKeyDown={handleOnKeyDown}
        ref={ref}
        className="flex flex-col gap-2 rounded-md bg-[#ffffffb2] shadow-[0_0px_20px_1px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-row">
          <BtnYes />
          <BtnNo />
        </div>
      </div>
    </div>
  )
}
export default Modal
