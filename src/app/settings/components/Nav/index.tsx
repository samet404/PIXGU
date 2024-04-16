import { Outfit } from 'next/font/google'
import NavItem from './components/NavItem'
import { api } from '@/trpc/server'

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
      className={`${outfit.className} flex h-full w-52 flex-col items-center gap-4 overflow-y-auto pt-7  text-[rgba(255,255,255,0.8)] shadow-[0_0px_40px_10px_rgba(0,0,0,0.4)]`}
    >
      {isLogged ? <NavItem name="Account" /> : null}
      <NavItem name="Themes" />
      <NavItem name="Controls" />
      <NavItem name="Sounds" />
    </nav>
  )
}

export default Nav
