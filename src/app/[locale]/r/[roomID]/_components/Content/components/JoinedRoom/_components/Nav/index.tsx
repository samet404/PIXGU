import BtnLeave from './components/BtnLeave'
import { Ping } from './components/Ping'
import { HostConnection } from './components/HostConnection'
import { Match } from './components/Match'

const Nav = () => {
  return (
    <nav
      className={`z-50 flex  w-full animate-fade-down flex-row items-center justify-between py-1 pl-2 pr-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]`}
    >
      <div className="flex flex-row items-center gap-2">
        <HostConnection />
        <Ping />
        <Match />
      </div>

      <BtnLeave />
    </nav>
  )
}

export default Nav
