import Spinner from '@/components/Spinner'
import Link from 'next/link'

type BtnProps = {
  text: string
  className?: string
  isLoading?: boolean
  onMouseDown?: () => void
  link?: {
    href: string
  }
}

export const Btn = ({ text, className, isLoading, onMouseDown, link }: BtnProps) => {
  if (link)
    return (
      <Link onMouseDown={onMouseDown} target='_blank' href={link.href} prefetch={false} className={`${className} bg-[#ffffff85] px-4 py-1 first:rounded-t-md last:rounded-b-md text-[2rem] flex flex-col justify-center hover:z-50 items-center font-[600] text-[#00000085] duration-200 hover:shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]`}>
        {text}
        {isLoading && <Spinner className="drop-shadow-none" />}
      </Link>
    )

  return (
    <button
      onMouseDown={onMouseDown}
      className={`${className} bg-[#ffffff85] px-4 py-1 first:rounded-t-md gap-2 last:rounded-b-md text-[2rem] flex flex-row justify-center items-center font-[600] text-[#00000085] hover:z-50 duration-200 hover:shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]`}
    >
      {text}
      {isLoading && <Spinner className="drop-shadow-none animate-duration-1000" />}
    </button>
  )
}
