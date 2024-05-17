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
  return <></>
}

export default Discord
