import Link from 'next/link'
import type { ComponentProps } from 'react'
import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] })
type MainButtonProps = {
  className?: string
  link: string
  icon: JSX.Element
  name: string
  description: string
  keyName: string
} & ComponentProps<'button'>

const MainButton = ({
  className,
  link,
  icon,
  name,
  description,
  keyName,
  ...rest
}: MainButtonProps) => {
  return (
    <Link href={link} className={'select-none cursor-none'}>
      <button
        className={`${className} relative flex h-full w-full flex-col justify-between  gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)]`}
        {...rest}
      >
        <div
          className={`${outfit.className} absolute right-3 top-3 h-6 w-6 rounded-md bg-[rgba(255,255,255,0.2)] font-[500] text-[rgba(255,255,255,0.6)]`}
        >
          {keyName}
        </div>
        <div className="flex flex-row items-center gap-2">
          {icon}
          <div
            className={`${outfit.className} text-2xl font-[700] text-[rgba(255,255,255,0.5)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]`}
          >
            {name}
          </div>
        </div>
        <div
          className={`${outfit.className} rounded-md bg-gradient-to-r from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.1)] p-2 text-left leading-5 text-[rgba(255,255,255,0.6)] shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)]`}
        >
          {description}
        </div>
      </button>
    </Link>
  )
}
export default MainButton
