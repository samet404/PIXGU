'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsxMerge } from '@/src/utils/clsxMerge'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type NavLinkProps = {
  icon: IconDefinition
  href: string
}

const NavLink = ({ icon, href }: NavLinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={clsxMerge(
        'flex h-12 w-16 items-center justify-center bg-[#ffffff54] shadow-[inset_0_0px_5px_0px_rgba(0,0,0,0.2)] drop-shadow-[0_0px_15px_#00e1ff8c] duration-300 first:rounded-l-md last:rounded-r-md lg:hover:bg-[#00e1ff93]',
        {
          'bg-[#00e1ff93]': pathname == href,
        },
      )}
    >
      <FontAwesomeIcon
        className="drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)]"
        icon={icon}
        color="rgba(255,255,255,0.7)"
      />
    </Link>
  )
}

export default NavLink
