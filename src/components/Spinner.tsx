import Image from 'next/image'
import img from '@/svg/spinner-one-third-svgrepo-com.svg'
import { clsxMerge } from '@/utils/clsxMerge'

type SpinnerProps = {
  sizes?: string | undefined
  className?: string | undefined
}

const Spinner = ({ sizes, className }: SpinnerProps) => (
  <Image
    className={clsxMerge(
      `size-10 animate-spin drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] animate-infinite ${className}`,
    )}
    src={img}
    alt="pls wait..."
    sizes={sizes ?? 'PUT_SIZES_HERE'}
  />
)

export default Spinner
