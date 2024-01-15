'use client'

import { useSpring, animated } from '@react-spring/web'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const NavItem = ({ name }: { name: string }) => {
  const pathname = usePathname()

  const isActive = (() => {
    if (name.toLowerCase() == 'account') {
      if (pathname === '/settings') return true
      if (pathname === '/settings/account') return true
      return false
    }

    if (name.toLowerCase() == 'themes') {
      if (pathname === '/settings/themes') return true
      return false
    }

    if (name.toLowerCase() == 'controls') {
      if (pathname === '/settings/controls') return true
      return false
    }

    if (name.toLowerCase() == 'sounds') {
      if (pathname === '/settings/sounds') return true
      return false
    }
  })()

  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
      scale: 1,
    },
    config: {
      duration: 1000,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        opacity: 0,
        scale: 0.5,
      },
      to: {
        opacity: 1,
        scale: 1,
      },
    })
  }

  return (
    <Link className="" href={`/settings/${name.toLowerCase()}`} replace>
      <animated.button
        onClick={handleClick}
        style={{ ...springs }}
        className={clsx(
          'rounded-md p-2 duration-200 selection:bg-[rgba(255,255,255,0.3)] lg:hover:bg-[rgba(255,255,255,0.15)]',
          {
            'bg-[rgba(255,255,255,0.15)]': isActive,
          },
        )}
      >
        {name}
      </animated.button>
    </Link>
  )
}

export default NavItem
