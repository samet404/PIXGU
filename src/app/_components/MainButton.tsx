'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { MuseoModerno } from 'next/font/google'
const museoModerno = MuseoModerno({ subsets: ['latin'] })

type MainButtonProps = {
  className?: string
  link: string
  icon: JSX.Element
  name: string
  description: string
} & ComponentProps<'button'>

const MainButton = ({
  className,
  link,
  icon,
  name,
  description,
  ...rest
}: MainButtonProps) => {
  return (
    <Link href={link} className={'select-none'}>
      <button
        className={`${className} flex  h-full w-full flex-col gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)]`}
        {...rest}
      >
        <div className="flex flex-row items-center gap-2">
          {icon}
          <div
            className={`${museoModerno.className} text-2xl text-[rgba(255,255,255,0.5)]`}
          >
            {name}
          </div>
        </div>
        <div className="rounded-md bg-[rgba(255,255,255,0.1)] p-2 text-left leading-5 text-[rgba(255,255,255,0.5)] shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)] ">
          {description}
        </div>
      </button>
    </Link>
  )
}
export default MainButton
