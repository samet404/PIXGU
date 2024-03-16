import { type ComponentProps } from 'react'

type BtnProps = {
  text: string
  className: string
} & ComponentProps<'button'>

const Btn = ({ text, className, ...rest }: BtnProps) => {
  return (
    <button
      {...rest}
      className={`${className} hover:opacity-50 rounded-md bg-[#ffffff85] px-4 font-[600] text-[#00000085]`}
    >
      {text}
    </button>
  )
}
export default Btn
