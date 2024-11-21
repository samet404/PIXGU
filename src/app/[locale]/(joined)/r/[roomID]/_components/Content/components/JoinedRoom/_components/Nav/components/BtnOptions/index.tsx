'use client'

import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import { isModalOpenAtom } from './atoms'
import dynamic from 'next/dynamic'
import { Svg } from '@/components/Svg'

const Modal = dynamic(() => import('./components/Modal').then((m) => m.default))

const BtnOptions = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom)

  return (
    <Fragment>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-[#ffffff18] w-7 text-sm text-[#ffffff7f] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]"
      >
        <Svg src='more-vertical-svgrepo-com.svg' alt="options" className="w-full h-full opacity-20" />
      </button>
      {typeof window !== 'undefined'
        ? isModalOpen
          ? createPortal(<Modal />, document.body)
          : null
        : null}


    </Fragment>
  )
}

export default BtnOptions
