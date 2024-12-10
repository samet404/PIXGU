import { useSpring, animated } from '@react-spring/web'
import { useAtom } from 'jotai'
import { createPortal } from 'react-dom'
import { isModalOpenAtom } from './atoms'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('./components/Modal').then((m) => m.Modal))

export const HavingIssuesBtn = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom)

  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
      opacity: 1,
    },
    config: {
      duration: 400,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        scale: 0.9,
        opacity: 0.7,
      },
      to: {
        scale: 1,
        opacity: 1,
      },
    })
    setIsModalOpen(true)
  }

  return (
    <Fragment>
      <animated.button
        onClick={handleClick}
        style={springs}
        className="z-10 flex h-full items-center justify-center rounded-md bg-[#ffffff82] px-4  text-[#02020285] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-65"
      >
        Need Help?
      </animated.button>
      {typeof window !== 'undefined'
        ? isModalOpen
          ? createPortal(<Modal />, document.body)
          : null
        : null}
    </Fragment>
  )
}
