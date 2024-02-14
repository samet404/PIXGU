'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsxMerge } from '@/src/utils/clsxMerge'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring, animated } from '@react-spring/web'

type NavLinkProps = {
  icon: IconDefinition
  href: string
}

const NavLink = ({ icon, href }: NavLinkProps) => {
  const pathname = usePathname()

  const [springs, api] = useSpring(() => ({
    from: {
      filter: 'brightness(1)',
    },
  }))

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    api.start({
      from: {
        filter: 'brightness(1.1)',
      },
      to: {
        filter: 'brightness(1)',
      },
    })
  }

  return (
    <animated.div
      onClick={handleClick}
      style={{ ...springs }}
      className={clsxMerge(
        'bg-[#ffffff54] drop-shadow-[0_0px_15px_#00e1ff8c] duration-[100ms] first:rounded-l-md last:rounded-r-md lg:hover:bg-[#00e1ffdd]',
        {
          'bg-[#00e1ff93]': pathname == href,
        },
      )}
    >
      <Link href={href} className="flex h-12 w-16 items-center  justify-center">
        <FontAwesomeIcon
          className="drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)]"
          icon={icon}
          color="rgba(255,255,255,0.7)"
        />
      </Link>
    </animated.div>
  )
}

export default NavLink
