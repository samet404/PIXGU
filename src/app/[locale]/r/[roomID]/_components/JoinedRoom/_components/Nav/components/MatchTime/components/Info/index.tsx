import type { LangObj } from '../../../../../../lang'
import { CoinAlert } from './components/CoinAlert'
import { RunningPowerups } from './components/RunningPowerups'
import { YourEarning } from './components/yourEarning'

export const Info = ({ langObj }: Props) => {
    return (
        <div className='p-2 w-[20rem] absolute bg-[#ffffffc8] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] top-10 left-0 text-[#0f446296] backdrop-blur-[1px] rounded-md flex-col gap-1 group-hover:flex group-hover:animate-fade-down animate-duration-200 hidden'>
            <CoinAlert text={langObj.coinAlert} />
            <RunningPowerups noRunningPowerupsText={langObj.runningPowerups.noRunning} runningPowerupsText={langObj.runningPowerups.running} />
            <YourEarning coinsText={langObj.yourEarning.coins} guesserText={langObj.yourEarning.guesser} painterText={langObj.yourEarning.painter} />
        </div>
    )
}

type Props = {
    langObj: LangObj['nav']['matchTime']['info']
}