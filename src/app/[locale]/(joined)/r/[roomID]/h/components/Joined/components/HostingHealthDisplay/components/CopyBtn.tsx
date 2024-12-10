import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostingHealth } from '@/zustand/store'
import { useSpring, animated } from '@react-spring/web'
import { useRef, useState } from 'react'

export const CopyBtn = () => {
  const hostStatus = useHostingHealth((s) => s.status)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(document.createElement('div'))
  const copiedTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffectOnce(() => {
    const url = window.location.href

    divRef.current.textContent = url
      .replace(`${url.split('/')[3]}/`, '')
      .replace('/h', '')
    return () => {
      clearTimeout(copiedTimeout.current)
    }
  })

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
    clearTimeout(copiedTimeout.current)
    copiedTimeout.current = setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    setIsCopied(true)
    await navigator.clipboard.writeText(divRef.current.textContent!)

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
  }

  return (
    <animated.button
      onClick={handleClick}
      style={springs}
      className="!hover:opactiy-60 rounded-md bg-[#ffffff82] px-4 leading-8 text-[#02020285] disabled:cursor-not-allowed disabled:opacity-65"
    >
      {isCopied ? 'Copied!' : 'Copy link'}
    </animated.button>
  )
}
