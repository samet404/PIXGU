import { useSpring, animated } from '@react-spring/web'
import { useAtom } from 'jotai'
import { createPortal } from 'react-dom'
import { isModalOpenAtom } from './atoms'
import { Modal } from './components/Modal'
import { Fragment } from 'react'

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

  const handleClick = async () => {
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
        Having issues?
      </animated.button>
      {typeof window !== 'undefined'
        ? isModalOpen
          ? createPortal(<Modal />, document.body)
          : null
        : null}
    </Fragment>
  )
}
