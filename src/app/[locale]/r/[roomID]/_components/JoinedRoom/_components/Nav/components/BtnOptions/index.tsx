'use client'

import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import { isModalOpenAtom } from './atoms'
import dynamic from 'next/dynamic'
import { Svg } from '@/components/Svg'
import Spinner from '@/components/Spinner'
import type { LangObj } from '../../../../lang'

const Modal = dynamic(() => import('./components/Modal').then((m) => m.Modal), {
  loading: () => <Spinner />
})

export const BtnOptions = ({ langObj }: Props) => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom)

  return (
    <Fragment>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-[#ffffff18]  flex flex-row gap-2 w-7 text-sm text-[#ffffff7f] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]"
      >
        <Svg src='more-vertical-svgrepo-com.svg' alt="options" className="w-full h-full opacity-20" />
        {typeof window !== 'undefined'
          ? isModalOpen
            ? createPortal(<Modal langObj={langObj} />, document.body)
            : null
          : null}
      </button>

    </Fragment>
  )
}

type Props = {
  langObj: LangObj['nav']['btnOptions']
}
