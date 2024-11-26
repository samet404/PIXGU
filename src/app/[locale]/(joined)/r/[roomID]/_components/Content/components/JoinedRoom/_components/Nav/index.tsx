import BtnOptions from './components/BtnOptions'
import { Ping } from './components/Ping'
import { HostConnection } from './components/HostConnection'
import { MatchCount } from './components/MatchCount'
import { MatchTime } from './components/MatchTime'
import { BtnOptionsShortcut } from './components/BtnOptionsShortcut'
import { XY } from './components/XY'
import { Theme } from './components/Theme'

const Nav = () => {
  return (
    <div className="z-[30] flex w-full animate-fade-down flex-col shadow-[0_0px_20px_1px_rgba(0,0,0,0.4)]">
      <div
        className={` flex h-[2.2rem] w-full  flex-row items-center justify-between py-1 pr-1 `}
      >
        <div className="flex flex-row  items-center gap-2 pl-2">
          <HostConnection />
          <Ping />
          <MatchCount />
          <MatchTime />
          <Theme />
          <XY />
        </div>

        <BtnOptionsShortcut />
        <BtnOptions />
      </div>
    </div>
  )
}

export default Nav
