import { clsxMerge } from '@/src/utils/clsxMerge'
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'

type BtnProps = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  icon: IconDefinition
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
      <FontAwesomeIcon
        icon={icon}
        color={isError ? '#ffffff7e' : isSuccess ? '#ffffff7e' : '#2d9dff'}
        className="!h-full w-full"
      />
    </button>
  )
}
export default Btn
