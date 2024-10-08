import Logo from '@/png/logo.png'
import Image from 'next/image'
import LanguageDropdown from './components/LanguageDropdown'
import SocialLinks from './components/LanguageDropdown/SocialLinks'

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between gap-1 pb-5 pt-2 xxs:w-[95%] lg:w-[55rem]">
      <div className="flex flex-row  items-end gap-4">
        <Image
          src={Logo}
          alt="logo"
          className="h-[6rem] w-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
      </div>

      <div className="flex flex-row items-center gap-5">
        <SocialLinks />
        <LanguageDropdown />
      </div>
    </nav>
  )
}

export default Navbar
