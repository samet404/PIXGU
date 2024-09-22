import { Value } from './Value'

export const GreenValue = ({ value, className }: Props) => {
  return (
    <Value
      value={value}
      className={`bg-gradient-to-tr from-[#73d36e90] to-[#80e27bb1] ${className}`}
    />
  )
}

type Props = {
  value: string
  className?: string
}
