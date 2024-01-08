// public
import Logo from '@/png/logo.png'
import Discord from '@/public/image/svg/Discord'
import Twitter from '@/public/image/svg/Twitter'
// components
import Image from 'next/image'
import Link from 'next/link'
import LanguageDropdown from './components/LanguageDropdown'

const Navbar = () => {
  return (
    <nav className="flex w-full flex-row justify-between gap-1">
      <div className="flex flex-row  items-center gap-4">
        <Image
          src={Logo}
          alt="logo"
          className="h-[6rem] w-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
        <div className="hidden flex-row flex-wrap gap-2 md:flex">
          <Link href="discord.gg/falan">
            <Discord
              width="2rem"
              height="2rem"
              color="rgba(255, 255, 255, 0.5)"
              className="hover:fill-[rgba(255,255,255,0.7)]"
            />
          </Link>
          <Link href="a">
            <Twitter
              width="2rem"
              height="2rem"
              color="rgba(255, 255, 255, 0.5)"
              className="hover:fill-[rgba(255,255,255,0.7)]"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <LanguageDropdown />
      </div>
    </nav>
  )
}

export default Navbar
