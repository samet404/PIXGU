import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { usePowerups } from '@/zustand/store/usePowerups'

export const RunningPowerups = ({ noRunningPowerupsText, runningPowerupsText }: Props) => {
    const runningPowerups = usePlayersPowerups(s => s.runningPowerupsArray)
    const myRunningPowerups = usePowerups(s => s.runningPowerupsArray)

    return <div className='flex flex-col gap-1 drop-shadow-[0_0px_2px_rgba(0,0,0,0.2)]'>
        {runningPowerups.length > 0 || myRunningPowerups.length > 0 ? <div>{runningPowerups}</div> : <div>{noRunningPowerupsText}</div>}

        <div className='flex flex-col gap-1 '>
            {runningPowerups.map((key) => <div key={key}>{key}</div>)}
            {myRunningPowerups.map((key) => {
                if (runningPowerups.includes(key)) return null
                return <div key={key}>{key}</div>
            })}
        </div>
    </div>
}

type Props = {
    runningPowerupsText: string
    noRunningPowerupsText: string
}