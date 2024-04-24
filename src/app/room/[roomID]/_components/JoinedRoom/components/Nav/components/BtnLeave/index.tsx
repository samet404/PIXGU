'use client'

import { useAtom } from 'jotai'
import Modal from './components/Modal'
import { Fragment, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { isModalOpenAtom } from './atoms'

const BtnLeave = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom)
  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsModalOpen(false)
  }

  return (
    <Fragment>
      <button
        onKeyDown={handleOnKeyDown}
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-[#ffffff42] px-2 py-1 text-sm text-[#ffffff7f]"
      >
        Leave
      </button>
      {typeof window !== 'undefined'
        ? isModalOpen
          ? createPortal(<Modal />, document.body)
          : null
        : null}
    </Fragment>
  )
}
export default BtnLeave
