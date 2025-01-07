
'use client'

import { Urbanist } from 'next/font/google'
import { Content } from './components/Content'
import { forwardRef, useImperativeHandle, useRef, type Ref } from 'react'
import type { LangObj } from '@/app/[locale]/create/lang'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600', '700'],
})

export const CreatedRooms = forwardRef(
  (
    { createdRoomsCount, createdRoomsText, roomsDataLang }: Props,
    ref: Ref<{
      refetch: () => void
    }>,
  ) => {
    console.log('roomsDataLang2', roomsDataLang)
    const contentRef = useRef<{
      refetch: () => void
    } | null>(null)

    useImperativeHandle(ref, () => ({
      refetch: contentRef.current!.refetch,
    }))

    return (
      <div
        className={`${urbanist.className} flex w-full animate-fade flex-col items-start gap-3 pb-[20rem] pt-6`}
      >
        <div className="text-[2rem] leading-3 text-[#bdf9e4]">
          {createdRoomsText}
        </div>
        <div className="text-[1rem] text-[#d6fadf]">
          {createdRoomsCount}
        </div>
        <div className="flex flex-col gap-1">
          <Content ref={contentRef} roomsDataLang={roomsDataLang} />
        </div>
      </div>
    )
  },
)

CreatedRooms.displayName = 'CreatedRooms'

type Props = {
  createdRoomsText: string
  createdRoomsCount: string
  roomsDataLang: LangObj['roomsData']
}