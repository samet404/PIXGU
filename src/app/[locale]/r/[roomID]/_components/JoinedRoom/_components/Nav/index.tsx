import { BtnOptions } from './components/BtnOptions'
import { Ping } from './components/Ping'
import { HostConnection } from './components/HostConnection'
import { MatchCount } from './components/MatchCount'
import { MatchTime } from './components/MatchTime'
import { BtnOptionsShortcut } from './components/BtnOptionsShortcut'
import { XY } from './components/XY'
import { Theme } from './components/Theme'
import type { LangObj } from '../../lang'

export const Nav = ({ langObj }: Props) => {
  return (
    <div className="z-[30] flex w-full flex-col shadow-[0_0px_20px_1px_rgba(0,0,0,0.4)]">
      <div className='flex h-[2.2rem] w-full  flex-row items-center justify-between py-1 pr-1'>
        <div className="flex flex-row  items-center gap-2 pl-2">
          <HostConnection langObj={langObj.hostConnection} />
          <Ping />
          <MatchCount heading={langObj.matchCount.heading} description={langObj.matchCount.description} />
          <MatchTime langObj={langObj.matchTime} />
          <Theme themeText={langObj.theme} />
          <XY />
        </div>

        <BtnOptionsShortcut alertText={langObj.btnOptionsShortcut.loading} />
        <BtnOptions langObj={langObj.btnOptions} />
      </div>
    </div>
  )
}

type Props = {
  langObj: LangObj['nav']
}