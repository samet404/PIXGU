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

const Discord = ({
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
      fill={color}
      height={height}
      width={width}
      className={`${className} rotate-[${rotation}deg]`}
      viewBox="0 0 512 512"
    >
      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
    </svg>
  )
}

export default Discord
