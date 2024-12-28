import { Outfit } from 'next/font/google'
import NavItem from './components/NavItem'
import HomeBtn from './components/HomeBtn'
import BackButton from '@/components/BackButton'
import type { Locale } from '@/types/locale'
import { getLangObj } from './lang'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500'],
})

const Nav = async ({ locale }: Props) => {
  const { account, controls, sounds, appearance, advanced, back, home } = await getLangObj(locale)

  return (
    <nav
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 0% 0%, rgba(0,170,255,0.12) 0px, transparent 50%)',
      }}
      className={`${outfit.className} flex h-full w-52 flex-col items-center gap-10 overflow-y-auto pb-5 pt-2 text-[rgba(255,255,255,0.8)] shadow-[0_0px_40px_10px_rgba(0,0,0,0.4)]`}
    >
      <div className='flex flex-row gap-1  items-center'>
        <BackButton className='text-[#ffffff9c] p-2'>
          {back}
        </BackButton>
        |
        <HomeBtn>
          {home}
        </HomeBtn>
      </div>

      <div className="flex flex-col items-center gap-4">
        <NavItem name={account} link='account' />
        <NavItem name={controls} link='controls' />
        <NavItem name={sounds} link='sounds' />
        <NavItem name={appearance} link='appearance' />
        <NavItem name={advanced} link='advanced' />
      </div>
    </nav>
  )
}

export default Nav

type Props = {
  locale: Locale
}
