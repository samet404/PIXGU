"use client"

import { Outfit } from 'next/font/google'
import { useOnClickOutside } from 'usehooks-ts'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useWebRTCTroubleshootingGuideModal } from '@/zustand/store'
import type { Locale } from '@/types/locale'
import { AlphaLoading } from '../AlphaLoading'

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '600', '700'] })

let Content: any

export const Modal = ({ locale }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const switchModal = useWebRTCTroubleshootingGuideModal((s) => s.switch)
  const ref = useRef(null)

  useEffect(() => {
    if (!ready) {
      import(`./Content/${locale}.mdx`).then(mdx => {
        Content = mdx.default
        setReady(true)
      })
    }
  }, [])

  useOnClickOutside(ref, switchModal)

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') switchModal()
  }

  if (!ready) return <AlphaLoading />

  return (
    <div
      style={{
        scrollbarWidth: 'none',
        backgroundImage:
          'radial-gradient(at 80% 100%, hsla(328,86%,44%,1) 0px, transparent 50%),radial-gradient(at 11% 100%, hsla(328,86%,44%,1) 0px, transparent 50%)',
      }}
      className={`${outfit.className} overflow-y-scroll bg-[#000000d3] backdrop-blur-sm overflow-x-hidden absolute left-0 top-0 z-50 flex h h-full w-full pb-4 pt-20`}>
      <div className='left-2 top-2 absolute text-[#ffffff6f] text-xs cursor-help'>Click up to close</div>
      <div
        onKeyUp={handleOnKeyDown}

        className='w-full h-full flex justify-center pt-7 px-2'
      >
        <div
          ref={ref}
          onKeyDown={handleOnKeyDown}
          className='animate-fade-up !selection:!bg-[#b7016c] w-full [&_ol>li::marker]:text-white h-full prose prose-code:text-pink-500 prose-headings:text-white prose-strong:text-white text-white'>
          <Content />
          <div className='pt-10'></div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  locale: Locale
}