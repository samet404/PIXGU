import Image from 'next/image'
import img from '@/svg/spinner-one-third-svgrepo-com.svg'
import { clsxMerge } from '@/utils/clsxMerge'

type SpinnerProps = {
  sizes?: string | undefined
  className?: string | undefined
}

const Spinner = ({ sizes, className }: SpinnerProps) => (
  <Image
    className={clsxMerge(`animate-spin ${className}`)}
    src={img}
    alt="loading..."
    sizes={sizes}
  />
)

export default Spinner
