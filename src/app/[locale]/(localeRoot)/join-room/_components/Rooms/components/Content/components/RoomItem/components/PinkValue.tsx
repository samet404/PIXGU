import { Value } from './Value'

export const PinkValue = ({ value, className }: Props) => {
  return <Value value={value} className={`bg-[#cb46a1b0] ${className}`} />
}

type Props = {
  value: string
  className?: string
}
