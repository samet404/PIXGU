import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

type DropdownContentItemProps = {
  text: string
  logo: any
  link: string
}

const DropdownContentItem = ({
  text,
  logo,
  link,
}: DropdownContentItemProps) => {
  return (
    <Link className="z-10 w-full" href={link}>
      <div className="flex w-full flex-row items-center gap-2 rounded-md bg-[rgba(0,0,0,0.2)] p-2">
        {logo}
        <div
          className={`${inter.className} font-[500] text-[rgba(255,255,255,0.71)]`}
        >
          {text}
        </div>
      </div>
    </Link>
  )
}

export default DropdownContentItem
