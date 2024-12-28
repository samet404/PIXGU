import Logo from '@/png/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import SocialLinks from '../SocialLinks'
import { LanguageDropdown } from './components/LanguageDropdown'
import type { Locale } from '@/types/locale'
import { getLangObj } from './lang'

export const Navbar = async ({ locale }: Props) => {
  const { portfolio, privacy } = await getLangObj(locale)

  return (
    <nav className="flex flex-row justify-between items-end gap-1 pb-5 pt-2 xxs:w-[95%] lg:w-[55rem]">
      <div className="flex flex-row  items-end gap-4">
        <Image
          src={Logo}
          alt="logo"
          className="h-[6rem] w-[6rem] select-none object-contain"
          sizes="calc(2.33vw + 90px)"
        ></Image>
      </div>

      <div className="flex flex-row items-center gap-5 text-[#ffffff82]">
        <SocialLinks />
        |
        <Link className='text-[0.8rem] hover:text-white font-[500]' target='_blank' href='https://404portfolio.vercel.app' prefetch={false}>{portfolio}</Link>
        |
        <Link className='text-[0.8rem] hover:text-white font-[500]' href={'/privacy'} prefetch={false}>{privacy}</Link>
        <LanguageDropdown locale={locale} />
      </div>
    </nav>
  )
}

type Props = {
  locale: Locale
}