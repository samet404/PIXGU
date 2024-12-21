import { clsxMerge } from '@/utils/clsxMerge'
import { Svg } from './Svg'

type SpinnerProps = {
  className?: string | undefined
}

const Spinner = ({ className }: SpinnerProps) => (
  <Svg
    className={clsxMerge(
      `size-10 animate-spin drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] animate-infinite ${className}`,
    )}
    src='spinner-one-third-svgrepo-com.svg'
    alt="pls wait..."
  />
)

export default Spinner
