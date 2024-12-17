'use client'

import { useSpring, animated } from '@react-spring/web'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({ name }: { name: string }) => {
  const pathname = usePathname()

  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
      scale: 1,
    },
    config: {
      duration: 200,
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
    <Link
      className=""
      href={`/settings/${name.toLowerCase()}`}
      prefetch={true}
      replace
    >
      <animated.button
        onClick={handleClick}
        style={{ ...springs }}
        className={clsx(
          'rounded-md p-2 duration-200 selection:bg-[rgba(255,255,255,0.3)] lg:hover:bg-[rgba(255,255,255,0.15)]',
          {
            'bg-[rgba(255,255,255,0.15)]': pathname.endsWith(
              `/settings/${name.toLowerCase()}`,
            ),
          },
        )}
      >
        {name}
      </animated.button>
    </Link>
  )
}

export default NavItem
