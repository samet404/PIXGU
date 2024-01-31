'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { clsxMerge } from '@/src/utils/clsxMerge'

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <Link
      href={href}
      className={clsxMerge(
        'flex h-11 w-11 items-center justify-center rounded-full border-[0.2rem] border-[#ffffff82] bg-[#ffffff54] shadow-[inset_0_0px_5px_0px_rgba(0,0,0,0.2)] drop-shadow-[0_0px_15px_#00e1ff8c] duration-300 lg:hover:bg-[#00e1ff93]',
        {
          'bg-[#00e1ff93]': pathname == href,
        },
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink
