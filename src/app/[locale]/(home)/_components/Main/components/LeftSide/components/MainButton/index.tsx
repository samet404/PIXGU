import { type ComponentProps } from 'react'
import ButtonLink from './components/ButtonLink'

import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] })

const MainButton = ({
  className,
  link,
  icon,
  roundedClass,
  name,
  description,
  keyName,
  disabled = false,
  disabledDesc = null,
  ...rest
}: MainButtonProps) => {
  if (disabled)
    return (
      <div className="relative h-full w-full">
        <div
          className={`${roundedClass} ${outfit.className} absolute z-10 flex h-full w-full cursor-not-allowed items-center justify-center text-[#ffffff82] backdrop-blur-sm`}
        >
          {disabledDesc && null}
        </div>

        <button
          className={`${roundedClass} relative flex h-full w-full flex-col gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)] `}
          {...rest}
        >
          <div
            className={`${outfit.className} right-3 top-3 h-6 w-6 rounded-md bg-[rgba(255,255,255,0.2)] font-[500] text-[rgba(255,255,255,0.6)] xxs:hidden lg:absolute`}
          >
            {keyName}
          </div>
          <div className="flex flex-row items-center gap-[0.35rem]">
            {icon}
            <div
              className={`${outfit.className} text-2xl font-[700] text-[rgba(255,255,255,0.5)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]`}
            >
              {name}
            </div>
          </div>
          <div
            className={`${outfit.className} w-full grow rounded-md bg-gradient-to-r from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.1)] p-2 text-left leading-5 text-[rgba(255,255,255,0.6)] shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)]`}
          >
            {description}
          </div>
        </button>
      </div>
    )

  return (
    <ButtonLink href={link}>
      <button
        className={`${className} ${roundedClass} relative flex h-full w-full flex-col gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)]`}
        {...rest}
      >
        <div
          className={`${outfit.className} right-3 top-3 h-6 w-6 rounded-md bg-[rgba(255,255,255,0.2)] font-[500] text-[rgba(255,255,255,0.6)] xxs:hidden lg:absolute`}
        >
          {keyName}
        </div>
        <div className="flex flex-row items-center gap-[0.35rem]">
          {icon}
          <div
            className={`${outfit.className} text-2xl font-[700] text-[rgba(255,255,255,0.5)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]`}
          >
            {name}
          </div>
        </div>
        <div
          className={`${outfit.className} w-full grow rounded-md bg-gradient-to-r from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.1)] p-2 text-left leading-5 text-[rgba(255,255,255,0.6)] shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)]`}
        >
          {description}
        </div>
      </button>
    </ButtonLink>
  )
}

export default MainButton

type MainButtonProps = {
  className?: string
  link: string
  icon: JSX.Element
  roundedClass?: `rounded-${string}-${string}` | null
  name: string
  description: string
  keyName: string
  disabled?: boolean
  disabledDesc?: string | null
} & ComponentProps<'button'>
