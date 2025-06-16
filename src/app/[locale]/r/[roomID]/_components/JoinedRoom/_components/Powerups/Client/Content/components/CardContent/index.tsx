'use client'

import { calculateCardPositions } from './funcs/calculatePositions'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { POWERUPS_SHOWS_TEXT } from '@/constants'
import type { LangObj } from '../../../../lang'
import type { Powerup, PowerupsShowsText } from '@/types/powerups'
import { usePowerups } from '@/zustand/store/usePowerups'
import { useEffect, useState } from 'react'
import { Card } from './components/Card'

export const CardContent = ({ langObj }: Props) => {
    const activeCards = usePowerups((s) => s.activePowerups)
    const powerupsHasTexts = usePowerups((s) => s.powerupsHasTexts)
    const dontDisplayPowerup = usePowerups((s) => s.dontDisplayPowerup)
    const displayingPowerups = usePowerups((s) => s.displayingPowerups)
    const setDisplayingPowerups = usePowerups((s) => s.setDisplayingPowerups)
    const [readyToDisplay, setreadyToDisplay] = useState<boolean>(false)

    useEffect(() => {
        setDisplayingPowerups(activeCards)
        setreadyToDisplay(true)
    }, [])

    if (readyToDisplay) return Array.from(displayingPowerups).map(powerup => {
        const powerupKey = powerup as Powerup
        const { description, title } = langObj[powerupKey]
        const position = calculateCardPositions(powerupKey, Array.from(displayingPowerups))
        console.log('')
        console.log('position: ', position)
        console.log('powerupsHasTexts: ', powerupsHasTexts)
        console.log({ powerupKey, title })
        const canShowText = POWERUPS_SHOWS_TEXT.includes(powerupKey)
        console.log('canShowText: ', canShowText)

        const backContent = (() => {
            if (
                !canShowText ||
                !powerupsHasTexts.includes(powerupKey)
            ) {
                console.log('backContent: ', null)
                return null
            }

            console.log('backContent: ', usePowerups.getState().powerups[powerupKey as PowerupsShowsText].data)
            return usePowerups.getState().powerups[powerupKey as PowerupsShowsText].data
        })()

        return (
            <Card
                keyName={powerup}
                backContent={backContent}
                active={activeCards.includes(powerup)}
                key={powerup}
                title={title as Powerup}
                description={description}
                rotation={position.rotation}
                addTranslateX={position.translateX}
                addTranslateY={position.translateY}
                onClicked={() => {
                    sendToHostPeer({
                        event: 'usePowerup',
                        data: {
                            name: powerup
                        }
                    })
                }}
                onDisplayRemove={() => dontDisplayPowerup(powerup)}
            />
        )
    })

}

type Props = {
    langObj: LangObj
}