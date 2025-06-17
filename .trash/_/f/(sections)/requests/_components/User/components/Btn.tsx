import { clsxMerge } from '@/utils/clsxMerge'
import { ReactNode, type ComponentProps } from 'react'

type BtnProps = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  icon: ReactNode
} & ComponentProps<'button'>

const Btn = ({ isLoading, isError, isSuccess, icon, ...rest }: BtnProps) => {
  return (
    <button
      disabled={isLoading}
      className={clsxMerge(
        'flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff7e] p-2 duration-150 hover:bg-[#ffffffba]',
        {
          'animate-pulse animate-infinite': isLoading,
          'bg-[#ff2e3c7e] hover:bg-[#ff00117e]': isError,
          'bg-[#42ff8a7e] hover:bg-[#00ff627e]': isSuccess,
        },
      )}
      {...rest}
    >
      <div className={clsxMerge('text-[#2d9dff]', {
        'text-[#ff2e3c]': isError,
        'text-[#42ff8a]': isSuccess,
      })}>
        {icon}
      </div>
    </button>
  )
}
export default Btn
