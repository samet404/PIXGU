import BtnLeave from './components/BtnLeave'
import { Outfit } from 'next/font/google'
import { Ping } from './components/Ping'
import { HostConnection } from './components/HostConnection'

const outfit = Outfit({
  subsets: ['latin'],
})

const Nav = () => {
  return (
    <nav
      className={`${outfit.className} z-50 flex  w-full animate-fade-down flex-row items-center justify-between py-1 pl-2 pr-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]`}
    >
      <div className="flex flex-row items-center gap-2">
        <HostConnection />

        <Ping />
      </div>

      <BtnLeave />
    </nav>
  )
}

export default Nav
