'use client'

import { Urbanist } from 'next/font/google'
import { Content } from './components/Content'
import { forwardRef, useImperativeHandle, useRef, type Ref } from 'react'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600', '700'],
})

export const CreatedRooms = forwardRef(
  (
    _: unknown,
    ref: Ref<{
      refetch: () => void
    }>,
  ) => {
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
          Created rooms
        </div>
        <div className="text-[1rem] text-[#d6fadf]">
          You can create max 4 rooms
        </div>
        <div className="flex flex-col gap-1">
          <Content ref={contentRef} />
        </div>
      </div>
    )
  },
)

CreatedRooms.displayName = 'CreatedRooms'
