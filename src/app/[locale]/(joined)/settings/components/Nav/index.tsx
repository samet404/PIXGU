import { Outfit } from 'next/font/google'
import NavItem from './components/NavItem'
import { api } from '@/trpc/server'
import HomeBtn from './components/HomeBtn'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500'],
})

const Nav = async () => {
  const isLogged = await api.auth.isLogged.query()

  return (
    <nav
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 0% 0%, rgba(0,170,255,0.12) 0px, transparent 50%)',
      }}
      className={`${outfit.className} flex h-full w-52 flex-col items-center justify-between overflow-y-auto pb-5 pt-7 text-[rgba(255,255,255,0.8)] shadow-[0_0px_40px_10px_rgba(0,0,0,0.4)]`}
    >
      <div className="flex flex-col items-center gap-4">
        <NavItem name="Account" />
        <NavItem name="Controls" />
        <NavItem name="Sounds" />
        <NavItem name="Advanced" />
      </div>

      <HomeBtn />
    </nav>
  )
}

export default Nav
