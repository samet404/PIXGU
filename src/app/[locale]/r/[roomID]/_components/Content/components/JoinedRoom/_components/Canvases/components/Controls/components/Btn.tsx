import type { StaticImageData } from 'next/image'
import Image from 'next/image'

export const Btn = ({ onMouseDown, img, className }: Props) => {
  return (
    <div
      className={`size-7 rounded-lg bg-[#0000003e] ${className}`}
      onMouseDown={onMouseDown}
    >
      <Image src={img} alt="controls_img" className="opacity-85" />
    </div>
  )
}

type Props = {
  onMouseDown?: () => void
  img: StaticImageData
  className?: string
}
