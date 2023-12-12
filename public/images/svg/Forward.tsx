'use client'

import type { Color } from '@/types/color'
import type { IntRange } from '@/types/intRange'

type RotationCheck = IntRange<1, 360>

type SvgProps = {
  width?: string
  height?: string
  color?: Color
  className?: string
  rotation?: RotationCheck
}

const Forward = ({
  width = '1rem',
  height = '1rem',
  color = 'rgba(0, 0, 0, 0.5)',
  className,
  rotation,
}: SvgProps): JSX.Element => {
  return (
    // Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.

    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={color}
      className={`${className} rotate-[${rotation}deg]`}
      viewBox="0 0 512 512"
    >
      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
    </svg>
  )
}

export default Forward
