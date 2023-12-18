'use client'

import { useRef, type ReactNode } from 'react'

const 0HoverEffectDiv = ({ children }: { children: ReactNode }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const xOffset = e.nativeEvent.pageX
    const yOffset = e.nativeEvent.pageY
    const cardHeight = divRef.current!.clientHeight
    const cardWidth = divRef.current!.clientWidth
    const heightCenter = Math.round(cardHeight / 2)
    const widthCenter = Math.round(cardWidth / 2)
    const rotateBaseValue = 10
    const rotateXValue =
      ((yOffset - heightCenter) / heightCenter) * rotateBaseValue
    const rotateYValue =
      ((widthCenter - xOffset) / widthCenter) * rotateBaseValue

    divRef.current!.style.transform = `rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`
  }

  const handleMouseOut = () => {
    divRef.current!.style.transform = ``
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      className="flex animate-fade flex-col gap-10 p-4 duration-[1200ms] animate-duration-1000"
    >
      {children}
    </div>
  )
}

export default HoverEffectDiv
