// public
import Logo from '@/png/logo.png'
// components
import Discord from '../Discord'
import Image from 'next/image'
import Link from 'next/link'
import LanguageDropdown from './components/LanguageDropdown'

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between gap-1 xxs:w-full lg:w-[55rem]">
      <div className="flex flex-row  items-center gap-4">
        <Image
          src={Logo}
          alt="logo"
          className="h-[6rem] w-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
        <div className="hidden flex-row flex-wrap gap-2 md:flex">
          <Link href="discord.gg/falan">
            <Discord />
          </Link>
          <Link href="twitter.com/falan"></Link>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <LanguageDropdown />
      </div>
    </nav>
  )
}

export default Navbar
