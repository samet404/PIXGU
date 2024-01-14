'use client'

import { useEffectOnce } from 'usehooks-ts'

const CustomCursor = () => {
  let customCursor: HTMLElement | null

  const handleMouseClick = () => {
    if (!customCursor) customCursor = document.getElementById('custom-cursor')
    const classList = customCursor?.classList

    classList!.add('bg-[rgba(255,255,255,0.5)]')
    setTimeout(() => classList!.remove('bg-[rgba(255,255,255,0.5)]'), 200)
  }

  const handleMousemove = (e: MouseEvent) => {
    if (!customCursor) customCursor = document.getElementById('custom-cursor')

    customCursor!.style.transform = `translate3d(${e.clientX - 10}px, ${
      e.clientY - 10
    }px,0)`
  }

  const handleBlur = () => {
    if (!customCursor) customCursor = document.getElementById('custom-cursor')

    customCursor!.style.opacity = '0'
    console.log('blur')
  }

  const handleFocus = () => {
    if (!customCursor) customCursor = document.getElementById('custom-cursor')

    customCursor!.style.opacity = '1'
    customCursor!.style.backgroundColor
  }

  useEffectOnce(() => {
    document.body.addEventListener('mousemove', handleMousemove)
    document.body.addEventListener('click', handleMouseClick)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
  })

  return (
    <div
      id="custom-cursor"
      className="pointer-events-none absolute z-[100] h-4 w-4 rounded-full bg-[rgba(255,255,255,0.2)] shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] backdrop-blur-[2px] duration-150"
    ></div>
  )
}

export default CustomCursor
