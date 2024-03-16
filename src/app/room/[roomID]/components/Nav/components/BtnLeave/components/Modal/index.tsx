import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { useOnClickOutside } from 'usehooks-ts'
import { type KeyboardEvent, useRef, useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import Btn from './components/Btn'
import { api } from '@/src/trpc/react'
import { useRouter } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
})

const Modal = () => {
  const {
    mutate: setNullPlayingRoomID,
    isSuccess: isSetNullPlayingRoomIDSuccess,
  } = api.gameRoom.setPlayingRoomIDToNull.useMutation()

  const router = useRouter()
  if (isSetNullPlayingRoomIDSuccess) router.refresh()

  const setIsModalOpen = useSetAtom(isModalOpenAtom)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsModalOpen(false))

  const leaveRoom = () => {
    setNullPlayingRoomID()
    setIsModalOpen(false)
  }

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsModalOpen(false)
  }

  return (
    <div
      className={`${inter.className} absolute z-10 flex h-full w-full animate-fade items-center justify-center bg-[#000000a5] backdrop-blur-md animate-duration-200`}
    >
      <div
        onKeyDown={handleOnKeyDown}
        ref={ref}
        className="flex flex-col gap-2 rounded-md bg-[#ffffffb2] shadow-[0_0px_20px_1px_rgba(0,0,0,0.6)]"
      >
        <div className="w-full px-8 py-1 text-lg font-[700] text-[#000000a0] shadow-lg">
          Are you sure ?
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <Btn className="" text="Yes" onClick={() => leaveRoom()} />
          <Btn className="" text="No" onClick={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  )
}
export default Modal
