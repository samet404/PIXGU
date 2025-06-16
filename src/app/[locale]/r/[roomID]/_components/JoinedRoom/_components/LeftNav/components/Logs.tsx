'use client'

import { Svg } from '@/components/Svg'
import { useInGameLogs } from '@/zustand/store/useInGameLogs'
import { Button } from './Button'

export const Logs = () => {
    const handleSwitch = useInGameLogs(s => s.switch)

    return (
        <Button
            shortcutName='Toggle In-Game Logs'
            key='logs'
            onMouseDown={() => handleSwitch()}
            className="hover:bg-[#ffffff45]"
            icon={<Svg src='paper-fold-text-svgrepo-com.svg' className='size-7 opacity-40' alt='Logs' />}
        />
    )
}